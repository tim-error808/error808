const loginController = require('../../../controllers/auth/loginController');
const UsersModel = require('../../../models/UsersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../../models/UsersModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('loginController', () => {
  let req, res;
  beforeEach(() => {
    req = { body: {}, cookies: {}, }; // cookies for completeness
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should return 400 if identifier or password is missing', async () => {
    req.body = { identifier: '', password: '' };
    await loginController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
  });

  it('should return 401 if user not found', async () => {
    req.body = { identifier: 'user', password: 'pass' };
    UsersModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    await loginController(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'User Not Found!' });
  });

  it('should return 401 if user is not active', async () => {
    req.body = { identifier: 'user', password: 'pass' };
    UsersModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue({ isActive: false }) });
    await loginController(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'User Not Found!' });
  });

  it('should return 401 if password does not match', async () => {
    req.body = { identifier: 'user', password: 'pass' };
    UsersModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue({ isActive: true, passwordHash: 'hash' }) });
    bcrypt.compare.mockResolvedValue(false);
    await loginController(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Wrong Password!' });
  });

  it('should login successfully and set cookies', async () => {
    req.body = { identifier: 'user', password: 'pass' };
    const fakeUser = { _id: '123', isActive: true, passwordHash: 'hash' };
    UsersModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(fakeUser) });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValueOnce('access_token').mockReturnValueOnce('refresh_token');
    await loginController(req, res);
    expect(res.cookie).toHaveBeenCalledWith('access_token', 'access_token', expect.any(Object));
    expect(res.cookie).toHaveBeenCalledWith('refresh_token', 'refresh_token', expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful!' });
  });
});
