import { Request, Response } from 'express';
import { createNewTask, findAllTask, findOneTask, deleteOneTask, updateOneTask} from '../services/taskService';
import {findUser } from "../services/userService";
import {Effect} from "effect";

import { BadRequestError, CustomError, NotFoundError, handleResponseError } from '../errorHandlers/errors';

const validateInput = (title: string, description: string, dueDate: Date, status: string): Effect.Effect<void, Error> => {
  if (!title || !description || !dueDate || !status) {
    return Effect.fail(BadRequestError('status is required'));
  } 
  else if(status !== 'To Do' && status !== 'In Progress' && status !== 'Done' ){
    return Effect.fail(BadRequestError('Wrong status'));
  }
  else {
    return Effect.succeed(() => {});
  }
};

const validateId = (userId: string, taskId: string): Effect.Effect<void, Error> => {
  if (!userId || !taskId) {
    return Effect.fail(BadRequestError("Id's required"));
  } else {
    return Effect.succeed(() => {});
  }
};

const validateUserId = (userId: string): Effect.Effect<void, Error> => {
  if(!userId){
    return Effect.fail(BadRequestError('userId is required'));
  }else{
    return Effect.succeed(() => {});
  }
}

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    await Effect.runPromise(validateUserId(userId));
    await Effect.runPromise(findUser(userId));

    const task = req.body;
    const {title, description, dueDate, status} = req.body;
    await Effect.runPromise(validateInput(title, description, dueDate, status));

    const effect = createNewTask(userId, task);
    const newTask = await Effect.runPromise(effect);

    return res.status(201).json(newTask);
  } 
  catch (error: CustomError | any) {
    return handleResponseError(res, error);
  }
};


export const getAllTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;

    await Effect.runPromise(validateUserId(userId));
    await Effect.runPromise(findUser(userId));

    const effect = findAllTask(userId);
    const tasks = await Effect.runPromise(effect);

    return res.status(200).json(tasks);
  } 
  catch (error: CustomError | any) {
    return handleResponseError(res, error);
  }
};



export const getTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const taskId = req.params.task_id;
    await Effect.runPromise(validateId(userId, taskId));
    await Effect.runPromise(findUser(userId));

    const effect = findOneTask(userId, taskId); 
    const task = await Effect.runPromise(effect);
    
    return res.status(200).json(task);
  }
  catch (error: CustomError | any) {
    return handleResponseError(res, error);
  }
};



export const updateTaskController = async(req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const taskId = req.params.task_id;

    await Effect.runPromise(validateId(userId, taskId));
    await Effect.runPromise(findUser(userId));

    const {title, description, dueDate, status} = req.body;
    await Effect.runPromise(validateInput(title, description, dueDate, status));

    const updatedTask = await Effect.runPromise(updateOneTask(userId, taskId, req.body));

    return res.status(200).json(updatedTask);
  } 
  catch (error: CustomError | any) {
    return handleResponseError(res, error);
  }
};



export const deleteTaskController = async(req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const taskId = req.params.task_id;

    await Effect.runPromise(validateId(userId, taskId));
    await Effect.runPromise(findUser(userId));

    await Effect.runPromise(deleteOneTask(userId, taskId));
    return res.status(204).json();
  } 
  catch (error: CustomError | any) {
    return handleResponseError(res, error);
  }
};
