import { Request, Response } from 'express';
import { createNewTask, findAllTask, findOneTask, deleteOneTask, updateOneTask} from '../services/taskService';
import {Effect} from "effect";


export const createTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const task = req.body;
    const effect = createNewTask(userId, task);
    const newTask = await Effect.runPromise(effect);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("failed to create task", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getAllTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const effect = findAllTask(userId);
    const tasks = await Effect.runPromise(effect);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("faled to fetch all tasks", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getTaskController = (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const taskId = req.params.task_id;
    const task = findOneTask(userId, taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("failed to fetch task", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const updateTaskController = (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const taskId = req.params.task_id;
    const updatedTask = updateOneTask(userId, taskId, req.body);

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const deleteTaskController = (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const taskId = req.params.task_id;
    const success = deleteOneTask(userId, taskId);

    if (!success) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).json();
  } catch (error) {
    console.error("failed to delete task", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
