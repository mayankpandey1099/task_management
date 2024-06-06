import { Request, Response } from 'express';
import { createNewUser } from '../services/userService';
import {Effect} from "effect";


const validateInput = (name: string, email: string): Effect.Effect<void, Error> => {
  if (!name || !email) {
    return Effect.fail(new Error('Name and email are required'));
  } else {
    return Effect.succeed(() => {});
  }
};

export const createUserController = async (req: Request, res: Response)=> {
  const { name, email } = req.body;
  try {
    await Effect.runPromise(validateInput(name, email));
    const effect = createNewUser(name, email);
    const result = await Effect.runPromise(effect);
    return res.status(201).json(result);
  }catch (error: any) {
    if (error.message === "Error: Name and email are required") {
      return res.status(400).json({error: "Name and email are required"});
    }else {
      return res.status(500).json(error.message);
    }
  }
};
