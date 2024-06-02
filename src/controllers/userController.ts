import { Request, Response } from 'express';
import { createNewUser } from '../services/userService';

export const createUserController = (req: Request, res: Response) => {
  const { name, email } = req.body;

  // Validation: Check if all required fields are provided
  if (!name || !email ) {
    return res.status(400).json({ error: 'Name, email are required' });
  }

  const newUser = createNewUser(name, email);
  res.status(201).json(newUser);
};