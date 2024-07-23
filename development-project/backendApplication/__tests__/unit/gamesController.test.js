const gameController = require('../../controllers/steamControllers/gamesController');
const Game = require('../../models/gameModel');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const DatabaseSetup = require('../../utils/databaseSetup');
jest.mock('../../services/steamService');
const steamService = require('../../services/steamService');

describe('Game Controller', () => {
  let mongoServer, res, next;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
    await DatabaseSetup.clearDatabase();
    await DatabaseSetup.createInitialData();

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAndProcessGames', () => {
    it('should fetch and process games correctly', async () => {
      const req = {
        user: { steamID: '12345' },
      };
      const mockOwnedGames = [
        { appid: 1, playtime_forever: 100 },
        { appid: 2, playtime_forever: 0 },
        { appid: 3, playtime_forever: 200 },
        { appid: 4, playtime_forever: 300 },
        { appid: 5, playtime_forever: 0 },
      ];
      steamService.getOwnedGames.mockResolvedValue(mockOwnedGames);

      const { gamesWithPlaytime } = await gameController.fetchAndProcessGames(
        req,
        res,
        next,
      );

      expect(steamService.getOwnedGames).toHaveBeenCalledWith('12345');
      expect(req.usergames).toEqual([
        { appid: 1, playtime: 100 },
        { appid: 3, playtime: 200 },
        { appid: 4, playtime: 300 },
      ]);
      expect(req.usergames).toEqual(gamesWithPlaytime);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('queryGames', () => {
    it('should correctly pass data as games parameter', async () => {
      const req = {
        appids: ['1', '2', '3', '4'],
      };

      steamService.getAppDetails.mockResolvedValue([
        {
          1: {
            success: true,
            data: {
              name: 'Game 1',
              header_image: 'image1.jpg',
              genres: [{ description: 'Action' }],
            },
          },
        },
        {
          2: {
            success: true,
            data: {
              name: 'Game 2',
              header_image: 'image2.jpg',
              genres: [{ description: 'RPG' }],
            },
          },
        },
        { 3: { success: false } },
        {
          4: {
            success: true,
            data: {
              name: 'Game 4',
              header_image: 'image4.jpg',
              genres: [{ description: 'Simulation' }],
            },
          },
        },
      ]);

      await gameController.queryGames(req, res, next);

      expect(req.games).toEqual([
        {
          appid: '1',
          name: 'Game 1',
          headerImage: 'image1.jpg',
          genres: ['Action'],
        },
        {
          appid: '2',
          name: 'Game 2',
          headerImage: 'image2.jpg',
          genres: ['RPG'],
        },
        {
          appid: '4',
          name: 'Game 4',
          headerImage: 'image4.jpg',
          genres: ['Simulation'],
        },
      ]);
      expect(next).toHaveBeenCalled();
    });
  });
});
