import { Request, Response } from 'express';
import { createNewUser } from '../services/userService';
import {Effect} from "effect";
import { BadRequestError, CustomError, handleResponseError} from '../errorHandlers/errors';


const validateInput = (name: string, email: string): Effect.Effect<void, Error> => {
  if (!name || !email) {
    return Effect.fail(BadRequestError('fields empty'));
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
  }
  catch (error: CustomError | any) {
    return handleResponseError(res, error);
  }
};
