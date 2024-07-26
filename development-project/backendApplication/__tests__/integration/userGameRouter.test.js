const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const createServer = require('../../utils/server');
const DatabaseSetup = require('../../utils/databaseSetup');

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
    it('should successfuly return 4 UserGames with correct data', async () => {
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

      //   Map error messages so they be checked
      const errorMessages = response.body.errors.map((err) => err.msg);
      expect(errorMessages).toContain(
        'Steamid must be exactly 17 characters long',
      );
      expect(errorMessages).toContain('Steamid must be a number');
    });
    it('should successfully return 1000 UserGames with queryDuration <600ms', async () => {
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
    it('should successfully return 3 UserGames with a partially correct name', async () => {
      const searchtext = 'game';
      const response = await supertest(app)
        .get(`/api/v1/usergames/12356789123456789/?searchtext=${searchtext}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(3);
      const allGamesContainSearchText = response.body.data.userGames.every(
        (game) => {
          return game.name.includes(searchtext);
        },
      );
      expect(allGamesContainSearchText).toBe(true);
    });
    it('should successfully return 1 UserGames with the exact correct name case insensitively', async () => {
      const searchtext = 'Four';
      const response = await supertest(app)
        .get(`/api/v1/usergames/12356789123456789/?searchtext=${searchtext}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(1);
      expect(response.body.data.userGames[0].name).toBe('four');
    });
    it('should successfully return one UserGame with the correct genre', async () => {
      const genre = 'Simulation';
      const response = await supertest(app)
        .get(`/api/v1/usergames/12356789123456789/?genre=${genre}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(1);
      expect(response.body.data.userGames[0].genres[0]).toBe('Simulation');
    });
    it('should successfully return 1 UserGame with the correct searchtext and genre', async () => {
      const genre = 'Action';
      const searchtext = 'gameOne';
      const response = await supertest(app)
        .get(
          `/api/v1/usergames/12356789123456789/?searchtext=${searchtext}&genre=${genre}`,
        )
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(1);
      expect(response.body.data.userGames[0].genres[0]).toBe('Action');
      expect(response.body.data.userGames[0].name).toBe('gameOne');
    });
    it('should successfully return 0 UserGames matching the searchtext and genre', async () => {
      const genre = 'Simulation';
      const searchtext = 'gameOne';
      const response = await supertest(app)
        .get(
          `/api/v1/usergames/12356789123456789/?searchtext=${searchtext}&genre=${genre}`,
        )
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(0);
    });
  });
  describe('GET /top-10-by-playtime/:steamid', () => {
    it('should return 10 games with expected data', async () => {
      const response = await supertest(app)
        .get('/api/v1/usergames/top-10-by-playtime/34567891234567890')
        .expect('Content-Type', /json/)
        .expect(200);

      const userGames = response.body.data.userGames;

      expect(response.body.status).toBe('success');
      expect(userGames).toHaveLength(10);
      const appids = userGames.map((game) => game.appid);
      const uniqueAppids = new Set(appids);
      expect(uniqueAppids.size).toBe(10);

      for (let i = 0; i < userGames.length - 1; i++) {
        expect(userGames[i].playtime).toBeGreaterThanOrEqual(
          userGames[i + 1].playtime,
        );
      }
    });
    it('should return as many games as the User has if less than 10', async () => {
      const response = await supertest(app)
        .get('/api/v1/usergames/top-10-by-playtime/12356789123456789')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.userGames).toHaveLength(4);
    });
  });
  describe('GET /total-playtime/:steamid', () => {
    it('should return the totalplaytime and number of games', async () => {
      const response = await supertest(app)
        .get('/api/v1/usergames/total-playtime/12356789123456789')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.totalPlaytime).toBe(14);
      expect(response.body.data.numberOfGames).toBe(4);
    });
  });
  describe('GET /top-genres-by-playtime/:steamid/:genres', () => {
    it('should return the top 6 genres by playtime with expected data', async () => {
      const response = await supertest(app)
        .get('/api/v1/usergames/top-genres-by-playtime/45678912345678901/6')
        .expect('Content-Type', /json/)
        .expect(200);

      const topGenres = response.body.data.topGenres;

      expect(response.body.status).toBe('success');
      expect(response.body.results).toBe(6);
      for (let i = 0; i < response.body.results - 1; i++) {
        expect(topGenres[i].totalPlaytime).toBeGreaterThanOrEqual(
          topGenres[i].totalPlaytime,
        );
      }
      expect(topGenres[0].genre).toBe('Building');
    });
    it('should return as many genres as possible if less than number requested available', async () => {
      const response = await supertest(app)
        .get('/api/v1/usergames/top-genres-by-playtime/12356789123456789/6')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.results).toBe(5);
    });
  });
});
