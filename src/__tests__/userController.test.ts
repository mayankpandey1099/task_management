
import { Request, Response } from 'express';
import { createUserController } from '../controllers/userController';

// Mocking Express Request and Response objects
const mockRequest = () => ({
  body: { name: 'John Doe', email: 'john@example.com' }
}) as Request;

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('User Controller', () => {
  it('should create a new user', () => {
    const req = mockRequest();
    const res = mockResponse();
    createUserController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
    email: 'john@example.com',
    name: 'John Doe'
    }));
  });
});