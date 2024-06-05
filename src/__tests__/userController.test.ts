
import { Request, Response } from 'express';
import { createUserController } from '../controllers/userController';
import { createNewUser } from '../services/userService';
import {Effect} from "effect";

const mockRequest = () => ({
  body: { name: 'John', email: 'john@example.com' }
}) as Request;

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

jest.mock('../services/userService',()=>({
    createNewUser: jest.fn(),
}));


describe('User Controller', () => {
  it('should create a new user', async() => {
    const req = mockRequest();
    const res = mockResponse();
    const user = req.body;
    const userMap = {'1': user};
    (createNewUser as jest.Mock).mockReturnValueOnce(Effect.succeed(userMap['1']));
    await createUserController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
    email: 'john@example.com',
    name: 'John'
    }));
  });
});