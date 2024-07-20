const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const createServer = require('../utils/server');
const UserGame = require('../models/userGameModel');
const User = require('..//models/userModel');
const Game = require('../models/gameModel');

// Creates instance of server without actually starting it
const app = createServer();

describe('User Game Router', () => {
  let mongoServer;

  beforeAll(async () => {
    // Creates in memory-instance of MongoDB without affecting real database
    mongoServer = await MongoMemoryServer.create();
    // Connects to fresh database
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Deletes existing collections in database
    await User.deleteMany({});
    await Game.deleteMany({});
    await UserGame.deleteMany({});

    // Creates User documents
    const users = [
      { steamID: '12356789123456789', username: 'userOne' },
      { steamID: '23456789123456789', username: 'userTwo' },
    ];
    await User.insertMany(users);

    // Creates Game documents
    const games = [
      { appid: '1', name: 'gameOne', genres: ['Action', 'RPG'] },
      { appid: '2', name: 'gameTwo', genres: ['RPG'] },
    ];
    await Game.insertMany(games);

    // Creates UserGame documents
    const userGames = [
      { appid: '1', steamid: '12356789123456789', playtime: 100 },
      { appid: '2', steamid: '12356789123456789', playtime: 200 },
    ];
    await UserGame.insertMany(userGames);
  });

  describe('GET /api/v1/usergames/:steamid', () => {
    it('should successfuly return 2 UserGame documents', async () => {
      // Make request to endpoint
      const response = await supertest(app)
        .get('/api/v1/usergames/12356789123456789')
        .expect('Content-Type', /json/)
        .expect(200);

      // Assertions of response data
      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(2);
      expect(response.body.data.userGames[1].appid).toBe('2');
      expect(response.body.data.userGames[0].genres).toContain('RPG');
    });
    it('should successfuly return 0 UserGame for User without games', async () => {
      const response = await supertest(app)
        .get('/api/v1/usergames/23456789123456789')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(0);
    });
    it('should successfuly return 0 UserGame for User without games', async () => {
      const response = await supertest(app)
        .get('/api/v1/usergames/a')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.status).toBe('fail');
      expect(response.body).toHaveProperty('errors');

      const errorMessages = response.body.errors.map((err) => err.msg);
      expect(errorMessages).toContain(
        'Steamid must be exactly 17 characters long',
      );
      expect(errorMessages).toContain('Steamid must be a number');
    });
  });
});
