const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const createServer = require('../utils/server');
const DatabaseSetup = require('../utils/databaseSetup');

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
    // DatabaseSetup is responsible for handling the mock database
    await DatabaseSetup.clearDatabase();
    await DatabaseSetup.createInitialData();
    await DatabaseSetup.createLargeData();
  });

  describe('GET /api/v1/usergames/:steamid', () => {
    it('should successfuly return 4 UserGame documents', async () => {
      // Make request to endpoint
      const response = await supertest(app)
        .get('/api/v1/usergames/12356789123456789')
        .expect('Content-Type', /json/)
        .expect(200);

      // Assertions of response data
      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(4);
      expect(response.body.data.userGames[1].appid).toBe('2');
      expect(response.body.data.userGames[1].playtime).toBe(200);
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
    it('should fail and send validation error when requesting invalid steamid format', async () => {
      const response = await supertest(app)
        .get('/api/v1/usergames/a')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.status).toBe('fail');
      expect(response.body).toHaveProperty('errors');

      //   Map error messages so they can easily be checked
      const errorMessages = response.body.errors.map((err) => err.msg);
      expect(errorMessages).toContain(
        'Steamid must be exactly 17 characters long',
      );
      expect(errorMessages).toContain('Steamid must be a number');
    });
    it('should successfully return 1000 UserGame with queryDuration <600ms', async () => {
      const startTime = performance.now();
      const response = await supertest(app)
        .get('/api/v1/usergames/34567891234567890')
        .expect('Content-Type', /json/)
        .expect(200);

      const endTime = performance.now();
      const queryDuration = endTime - startTime;

      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(1000);
      expect(queryDuration).toBeLessThan(600);
    });
  });

  describe('GET /api/v1/usergames/:steamid/:searchtext', () => {
    it('should successfully return the userGame document for gameOne', async () => {
      const response = await supertest(app)
        .get('/api/v1/usergames/12356789123456789/gameOne')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(1);
      expect(response.body.data.userGames[0].name).toBe('gameOne');
      expect(response.body.data.userGames[0].genres).toContain('Action');
      expect(response.body.data.userGames[0].playtime).toBe(100);
    });
    it('should successfully return the userGame document for many games', async () => {
      const response = await supertest(app)
        .get('/api/v1/usergames/12356789123456789/Game')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(3);
      const names = response.body.data.userGames.map((game) => game.name);
      const namesContainSearchText = names.every((name) =>
        name.includes('game'),
      );
      expect(namesContainSearchText).toBe(true);
    });
  });
});
