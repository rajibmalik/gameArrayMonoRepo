const gameController = require('../../../controllers/apiControllers/gameController');
const Game = require('../../../models/gameModel');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const DatabaseSetup = require('../../../utils/databaseSetup');

describe('gameController', () => {
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

  it('should get all of the users Games', async () => {
    const req = {};
    await gameController.getGames(req, res);

    const responseData = res.json.mock.calls[0][0];
    expect(responseData.status).toBe('success');
    expect(responseData.results).toBe(6);
  });

  it('should get the Game requested', async () => {
    const req = { params: { appid: '1' } };
    await gameController.getGame(req, res);

    const responseData = res.json.mock.calls[0][0];
    expect(responseData.status).toBe('success');
    expect(responseData.data.game).toBeDefined();
    expect(responseData.data.game.appid).toBe('1');
    expect(responseData.data.game.name).toBe('gameOne');
    expect(responseData.data.game.genres).toEqual(['Action', 'RPG']);
  });
});
