import { Request, Response } from 'express';
import { createNewUser } from '../services/userService';
import {Effect} from "effect";

export const createUserController = async (req: Request, res: Response)=> {
  const { name, email } = req.body;

  // Validation: Check if all required fields are provided
  if (!name || !email ) {
    return res.status(400).json({ error: 'Name, email are required' });
  }
  try {
    const effect = createNewUser(name, email);
    const result = await Effect.runPromise(effect);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create the user" });
  }
};