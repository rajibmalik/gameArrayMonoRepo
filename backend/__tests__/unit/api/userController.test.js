const userController = require('../../../controllers/apiControllers/userController');
const User = require('../../../models/userModel');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const DatabaseSetup = require('../../../utils/databaseSetup');

describe('userController', () => {
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

  it('should get all of the Users', async () => {
    const req = {};
    await userController.getAllUsers(req, res);

    const responseData = res.json.mock.calls[0][0];
    expect(responseData.status).toBe('success');
    expect(responseData.results).toBe(4);
  });

  it('should get one User', async () => {
    const req = {
      params: { steamID: '12356789123456789' },
    };
    await userController.getUser(req, res);

    const responseData = res.json.mock.calls[0][0];
    expect(responseData.status).toBe('success');
    expect(responseData.data.user).toHaveProperty(
      'steamID',
      '12356789123456789',
    );
  });
});
