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
    await UserGame.deleteMany({});

    // Creates User documents
    const testUser = new User({ steamID: '1', username: 'testUserOne' });
    await testUser.save();

    // Creates Game documents
    const games = [
      { appid: '1', name: 'gameOne' },
      { appid: '2', name: 'gameTwo' },
    ];
    await Game.insertMany(games);

    // Creates UserGame documents
    const userGames = [
      { appid: '1', steamid: '1', playtime: 100 },
      { appid: '2', steamid: '1', playtime: 200 },
    ];
    await UserGame.insertMany(userGames);
  });

  describe('GET /api/v1/usergames/:steamid', () => {
    it('should successfuly return 2 UserGame documents', async () => {
      // Make request
      const response = await supertest(app)
        .get('/api/v1/usergames/1')
        .expect('Content-Type', /json/)
        .expect(200);

      // Assertions
      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(2);
      expect(response.body.data.userGames[1].appid).toBe('2');
    });
  });
});
