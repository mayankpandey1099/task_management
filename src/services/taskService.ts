import { Task } from '../models/taskModel';
import { v4 as uuidv4 } from 'uuid';
import {Effect} from "effect";

const usersTasks: Map<string, Map<string, Task>> = new Map();

/*
creating task, taking userId, task and creating neew taskId, 
storing in map containg userId 
*/

export const createNewTask = (userId: string, task: Omit<Task, 'id'>): Effect.Effect<Task> => {
  const taskId = uuidv4();
  const newTask: Task = { id: taskId, ...task };

  if (!usersTasks.has(userId)) {
    usersTasks.set(userId, new Map());
  }

  usersTasks.get(userId)!.set(taskId, newTask);

  return Effect.succeed(newTask);
};

/*
getting task, taking userId and returning task array 
first putting values in iterable and converting to array
*/

export const findAllTask = (userId: string): Effect.Effect<Task[]> => {
  if (!usersTasks.has(userId)) {
    return Effect.succeed([]);
  }
  return Effect.succeed(Array.from(usersTasks.get(userId)!.values()));
};


/*
getting particular task with taskId and userId
*/

export const findOneTask = (userId: string, taskId: string): Effect.Effect<Task | null> => {
  if (!usersTasks.has(userId) || !usersTasks.get(userId)!.has(taskId)) {
    return Effect.succeed(null);
  }

  return Effect.succeed(usersTasks.get(userId)!.get(taskId) || null);
};

/*
updating task, taking userId, taskId, and replacing the new task with previous task by set method
*/

export const updateOneTask = (userId: string, taskId: string, task: Omit<Task, 'id'>): Effect.Effect<Task | null> => {
  if (!usersTasks.has(userId) || !usersTasks.get(userId)!.has(taskId)) {
    return Effect.succeed(null);
  }

  const updatedTask: Task = { id: taskId, ...task };

  usersTasks.get(userId)!.set(taskId, updatedTask);

  return Effect.succeed(updatedTask);
};

/*
deleting task, taking userId, taskId, first fetching the element and using delete method to delete it from map.
*/

export const deleteOneTask = (userId: string, taskId: string): boolean => {
  if (!usersTasks.has(userId) || !usersTasks.get(userId)!.has(taskId)) {
    return false;
  }

  usersTasks.get(userId)!.delete(taskId);

  return true;
};
