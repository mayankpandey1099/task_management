import { Task } from '../models/taskModel';
import { v4 as uuidv4 } from 'uuid';
import {Effect} from "effect";
import {NotFoundError} from "../errorHandlers/errors";

const usersTasks: Map<string, Map<string, Task>> = new Map();


export const createNewTask = (userId: string, task: Omit<Task, 'id'>): Effect.Effect<Task> => {
  const taskId = uuidv4();
  const newTask: Task = { id: taskId, ...task };

  if (!usersTasks.has(userId)) {
    usersTasks.set(userId, new Map());
  }

  usersTasks.get(userId)!.set(taskId, newTask);

  return Effect.succeed(newTask);
};


export const findAllTask = (userId: string): Effect.Effect<Task[]> => {
  if (!usersTasks.has(userId)) {
    return Effect.succeed([]);
  }
  return Effect.succeed(Array.from(usersTasks.get(userId)!.values()));
};



export const findOneTask = (userId: string, taskId: string): Effect.Effect<Task | null, Error> => {
  if (!usersTasks.has(userId) || !usersTasks.get(userId)!.has(taskId)) {
    return Effect.fail(NotFoundError('Task not found'));
  }else{
    return Effect.succeed(usersTasks.get(userId)!.get(taskId) || null);
  }
};


export const updateOneTask = (userId: string, taskId: string, task: Omit<Task, 'id'>): Effect.Effect<Task | null, Error> => {
  if (!usersTasks.has(userId) || !usersTasks.get(userId)!.has(taskId)) {
    return Effect.fail(NotFoundError('Task not found'));
  }

  const updatedTask: Task = { id: taskId, ...task };

  usersTasks.get(userId)!.set(taskId, updatedTask);

  return Effect.succeed(updatedTask);
};



export const deleteOneTask = (userId: string, taskId: string): Effect.Effect<boolean, Error> => {
  if (!usersTasks.has(userId) || !usersTasks.get(userId)!.has(taskId)) {
    return Effect.fail(NotFoundError('Task not found'));
  }
  usersTasks.get(userId)!.delete(taskId);
  return Effect.succeed(true);
};
