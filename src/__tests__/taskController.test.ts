
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { createNewTask, findAllTask, findOneTask, deleteOneTask, updateOneTask} from '../services/taskService';
import {
  createTaskController,
  getAllTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController
} from '../controllers/taskController';

import {Effect} from "effect";


const mockRequest = () => ({
  params: { user_id: '123', task_id: '10'} as ParamsDictionary,
  body: { title: 'Test Task', description: 'Task Description', dueDate: new Date(), status: 'To Do' }
}) as Request;

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

jest.mock('../services/taskService', () => ({
  createNewTask: jest.fn(),
  findAllTask: jest.fn(),
  findOneTask: jest.fn(),
  deleteOneTask: jest.fn(),
  updateOneTask: jest.fn(),
}));

describe('Task Controller', () => {

  it('should create a new task', async() => {
    const req = mockRequest();
    const res = mockResponse();

    const task = { ...req.body };
    const tasks = {'10' : task};
    const taskMap = { '123': tasks };
    (createNewTask as jest.Mock).mockReturnValueOnce(Effect.succeed(taskMap['123']));

    await createTaskController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    
  });

  it('should get all tasks', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const tasks = [
      { id: '11', title: 'Task 1', description: 'Description 1', dueDate: new Date(), status: 'To Do' },
      { id: '12', title: 'Task 2', description: 'Description 2', dueDate: new Date(), status: 'In Progress' }
    ];
    const taskMap = { '123': tasks };
    (findAllTask as jest.Mock).mockReturnValueOnce(Effect.succeed(taskMap['123']));

    await getAllTaskController(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);

  });

  it('should get one task', () => {
    const req = mockRequest();
    const res = mockResponse();

    const task = { ...req.body };
    const tasks = {'10': task};
    const taskMap = { '123': tasks };
    (findOneTask as jest.Mock).mockReturnValueOnce(taskMap['123']);

    getTaskController(req, res);
    expect(res.status).toHaveBeenCalledWith(200);

  });

  it('should update a task', () => {
    const req = mockRequest();
    const res = mockResponse();

    const updatedTask = { ...req.body };
    const tasks = {'10': updatedTask};
    const taskMap = { '123': tasks};
    (updateOneTask as jest.Mock).mockReturnValueOnce(taskMap['123']);

    updateTaskController(req, res);
    expect(res.status).toHaveBeenCalledWith(200);

  });

  it('should delete a task', () => {
    const req = mockRequest();
    const res = mockResponse();

    const taskMap = { '123': true };
    (deleteOneTask as jest.Mock).mockReturnValueOnce(taskMap['123']);

    deleteTaskController(req, res);
    expect(res.status).toHaveBeenCalledWith(204);

  });
});
