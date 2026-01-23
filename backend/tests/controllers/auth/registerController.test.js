const registerController = require('../../../controllers/auth/registerController');
const UsersModel = require('../../../models/UsersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('registerController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { username: 'testuser', email: 'test@example.com', password: 'password123' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn()
    };
    jest.clearAllMocks();
  });

  it('should return 400 if any field is missing', async () => {
    req.body = { username: '', email: '', password: '' };
    await registerController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
  });

  it('should return 409 if user already exists', async () => {
    UsersModel.findOne = jest.fn().mockReturnValue({ exec: () => Promise.resolve({ _id: '1' }) });
    await registerController(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Username or email already in use' });
  });

  it('should create user and return 201 on success', async () => {
    UsersModel.findOne = jest.fn().mockReturnValue({ exec: () => Promise.resolve(null) });
    UsersModel.create = jest.fn().mockResolvedValue({ _id: '123' });
    bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
    jwt.sign = jest.fn().mockReturnValue('token');

    await registerController(req, res);

    expect(UsersModel.create).toHaveBeenCalledWith(expect.objectContaining({
      username: 'testuser',
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
    }));
    expect(res.cookie).toHaveBeenCalledWith('access_token', 'token', expect.any(Object));
    expect(res.cookie).toHaveBeenCalledWith('refresh_token', 'token', expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Registration successful!' });
  });
});
