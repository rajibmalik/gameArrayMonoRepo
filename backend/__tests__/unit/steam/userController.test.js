const userController = require('../../../controllers/steamControllers/userController');
const User = require('../../../models/userModel');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const DatabaseSetup = require('../../../utils/databaseSetup');

describe('User Controller', () => {
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

    // Set up mock res and next for each test so we can make assertions
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('createUser', () => {
    it('should create a new user if not already in database', async () => {
      const req = {
        user: {
          steamID: '123567891234567854',
          username: 'newUser',
        },
      };

      const result = await userController.createUser(req, res, next);
      //   Check the User has correct data
      expect(result).toBeTruthy();
      expect(result.steamID).toBe('123567891234567854');
      expect(result.username).toBe('newUser');

      //   Check User is in the database
      const createdUser = await User.findOne({ steamID: '123567891234567854' });
      expect(createdUser).toBeTruthy();
      expect(createdUser.username).toBe('newUser');
      expect(next).toHaveBeenCalled();
    });

    it('should not create a new user if the user is already in the database', async () => {
      const req = {
        user: {
          steamID: '12356789123456789',
          username: 'userOne',
        },
      };

      const result = await userController.createUser(req, res, next);

      expect(result).toBeTruthy();
      expect(result.steamID).toBe('12356789123456789');
      expect(result.username).toBe('userOne');

      const users = await User.find({ steamID: '12356789123456789' });
      expect(users.length).toBe(1);
      expect(users[0].username).toBe('userOne');
      expect(next).toHaveBeenCalled();
    });

    it('should handle errors properly if the req has incorrect user data', async () => {
      const req = { user: null };

      const result = await userController.createUser(req, res, next);
      expect(result).toBeNull();

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'fail',
          error: expect.any(String),
        }),
      );
      expect(next).not.toHaveBeenCalled();
    });
  });
});
