import { Response } from 'express';

export interface CustomError extends Error {
  statusCode: number;
}

const createError = (statusCode: number, message: string): CustomError => {
  const error: CustomError = new Error(message) as CustomError;
  error.statusCode = statusCode;
  return error;
};

const handleErrorResponse = (res: Response, error: CustomError) => {
  return res.status(error.statusCode).json(error.message);
};

export const handleResponseError = (res: Response, error: Error) => {
  if(error.message === 'BadRequestError: fields empty'){
    return handleErrorResponse(res, createError(400, 'Name and email are required'));
  }
  else if (error.message === 'BadRequestError: status is required') {
    return handleErrorResponse(res, createError(400, 'title, description, dueDate and status is required'));
  }
  else if(error.message === 'BadRequestError: Wrong status'){
    return handleErrorResponse(res, createError(400, "Wrong status. try with 'To Do' || 'In Progress' || 'Done'"));
  }
  else if(error.message === "BadRequestError: Id's required"){
    return handleErrorResponse(res, createError(400, "User_Id and Task_id required"));
  }
  else if (error.message === 'NotFoundError: User not found') {
    return handleErrorResponse(res, createError(404, 'User not found'));
  }
  else if(error.message === 'NotFoundError: Task not found'){
    return handleErrorResponse(res, createError(404, 'Task not found'));
  }
  else {
    return handleErrorResponse(res, createError(500, error.message));
  }
};

export const BadRequestError = (message: string): Error => {
  const error = createError(400, message);
  error.name = 'BadRequestError';
  return error;
};

export const NotFoundError = (message: string): Error => {
  const error = createError(404, message);
  error.name = 'NotFoundError';
  return error;
};
