import { Request, Response } from 'express';
import { createNewTask, findAllTask, findOneTask, deleteOneTask, updateOneTask} from '../services/taskService';
import {findUser } from "../services/userService";
import {Effect} from "effect";

const validateInput = (title: string, description: string, dueDate: Date, status: string): Effect.Effect<void, Error> => {
  if (!title || !description || !dueDate || !status) {
    return Effect.fail(new Error('data missing'));
  } else {
    return Effect.succeed(() => {});
  }
};

const validateId = (userId: string, taskId: string): Effect.Effect<void, Error> => {
  if (!userId || !taskId) {
    return Effect.fail(new Error('userId and taskId are required'));
  } else {
    return Effect.succeed(() => {});
  }
};

const validateUserId = (userId: string): Effect.Effect<void, Error> => {
  if(!userId){
    return Effect.fail(new Error('userId is required'));
  }else{
    return Effect.succeed(() => {});
  }
}

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    
    await Effect.runPromise(validateUserId(userId));
    const task = req.body;
    const {title, description, dueDate, status} = req.body;

    await Effect.runPromise(validateInput(title, description, dueDate, status));

    const effect = createNewTask(userId, task);

    const newTask = await Effect.runPromise(effect);

    return res.status(201).json(newTask);
  } 
  catch (error: any) {
     if (error.message === "Error: data missing") {
      return res.status(400).json({error: "title, description, dueDate and status is required"});
    }else {
      return res.status(500).json(error.message);
    }
  }
};


export const getAllTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;

    await Effect.runPromise(validateUserId(userId));
    //await Effect.runPromise(findUser(userId));

    const effect = findAllTask(userId);
    const tasks = await Effect.runPromise(effect);
    return res.status(200).json(tasks);
  } 
  catch (error: any) {
    if(error.message === "Error: User not found"){
      return res.status(400).json({error: 'User not found'});
    }else{
    return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};



export const getTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const taskId = req.params.task_id;
    await Effect.runPromise(validateId(userId, taskId));
    //await Effect.runPromise(findUser(userId));

    const task = await Effect.runPromise(findOneTask(userId, taskId));

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json(task);
  }
  catch (error: any) {
    if(error.message === "Error: userId and taskId are required"){
      return res.status(400).json({ error: 'userId and taskId are required' });
    }
    else if(error.message === "Error: User not found"){
      return res.status(400).json({error: 'User not found'});
    }
    else{
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};



export const updateTaskController = async(req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const taskId = req.params.task_id;

    await Effect.runPromise(validateId(userId, taskId));

    const updatedTask = await Effect.runPromise(updateOneTask(userId, taskId, req.body));

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json(updatedTask);
  } 
  catch (error: any) {
    if(error.message === "Error: userId and taskId are required"){
      return res.status(400).json({ error: 'userId and taskId are required' });
    }
    else{
    return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};



export const deleteTaskController = async(req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const taskId = req.params.task_id;

    await Effect.runPromise(validateId(userId, taskId));

    const success = await Effect.runPromise(deleteOneTask(userId, taskId));

    if (!success) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(204).json();
  } 
  catch (error: any) {
    if(error.message === "Error: userId and taskId are required"){
      return res.status(400).json({ error: 'userId and taskId are required' });
    }
    else{
    return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
