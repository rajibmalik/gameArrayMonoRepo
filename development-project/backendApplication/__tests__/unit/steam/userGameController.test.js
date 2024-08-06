const userGamesController = require('../../../controllers/steamControllers/userGameController');
const UserGame = require('../../../models/userGameModel');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const DatabaseSetup = require('../../../utils/databaseSetup');

describe('UserGames Controller', () => {
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

  it('should create one new UserGame ', async () => {
    const req = {
      user: { steamID: '23456789123456789' },
      usergames: [{ appid: '1', playtime: 100 }],
    };

    await userGamesController.createAndUpdateUserGames(req, res, next);

    expect(next).toHaveBeenCalled();

    const userGames = await UserGame.find({
      steamid: '23456789123456789',
    });

    expect(userGames).toHaveLength(1);
    expect(userGames[0].appid).toBe('1');
    expect(userGames[0].steamid).toBe('23456789123456789');
    expect(userGames[0].playtime).toBe(100);
  });

  it('should create three new UserGame ', async () => {
    const req = {
      user: { steamID: '23456789123456789' },
      usergames: [
        { appid: '1', playtime: 50 },
        { appid: '2', playtime: 75 },
        { appid: '3', playtime: 100 },
      ],
    };

    await userGamesController.createAndUpdateUserGames(req, res, next);

    expect(next).toHaveBeenCalled();

    const userGames = await UserGame.find({
      steamid: '23456789123456789',
    });

    expect(userGames).toHaveLength(3);
    expect(userGames[0].appid).toBe('1');
    expect(userGames[0].steamid).toBe('23456789123456789');
    expect(userGames[0].playtime).toBe(50);
  });

  it('should update one existing new UserGame ', async () => {
    const req = {
      user: { steamID: '12356789123456789' },
      usergames: [{ appid: '1', playtime: 10000 }],
    };

    await userGamesController.createAndUpdateUserGames(req, res, next);

    expect(next).toHaveBeenCalled();

    const userGame = await UserGame.findOne({
      steamid: '12356789123456789',
      appid: '1',
    });

    expect(userGame.appid).toBe('1');
    expect(userGame.steamid).toBe('12356789123456789');
    expect(userGame.playtime).toBe(10000);
  });
  it('should not create a non existing game', async () => {
    const req = {
      user: { steamID: '12356789123456789' },
      usergames: [{ appid: '100', playtime: 100 }],
    };

    await userGamesController.createAndUpdateUserGames(req, res, next);

    expect(next).toHaveBeenCalled();

    const userGame = await UserGame.findOne({
      steamid: '12356789123456789',
      appid: '100',
    });

    expect(userGame).toBeNull();
  });
  it('should only create the existing games ', async () => {
    const req = {
      user: { steamID: '12356789123456789' },
      usergames: [
        { appid: '1', playtime: 10000 },
        { appid: '2000', playtime: 50 },
      ],
    };

    await userGamesController.createAndUpdateUserGames(req, res, next);

    expect(next).toHaveBeenCalled();

    const userGames = await UserGame.find({
      steamid: '12356789123456789',
    });

    expect(userGames).toHaveLength(1);
  });
});
