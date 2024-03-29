import { NextFunction, Request, Response } from 'express';
import { CastError } from 'mongoose';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === 'CastError' && (err as CastError).kind === 'ObjectId') {
    message = 'Resource Not Found';
    statusCode = 404;
  } else if (
    err.name === 'ValidationError' ||
    err.name === 'InvalidRequestDataError'
  ) {
    message = err.message;
    statusCode = 400;
  } else if (err.name === 'ResourceNotFoundError') {
    message = err.message;
    statusCode = 404;
  } else if (err.name === 'ResourceAlreadyExistsError') {
    message = err.message;
    statusCode = 409;
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🤖' : err.stack,
  });
};
