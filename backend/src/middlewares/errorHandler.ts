import type { NextFunction, Response } from 'express';
import { ZodError } from 'zod';
import HttpError from '../utils/HttpError';
import type { Request } from '../utils/types';

// Error handler middleware
export function errorHandler(
  err: Error | HttpError | ZodError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    // If the error is an instance of ZodError (from Zod validation), handle it as a 400 Bad Request
    res.status(400);
    res.json({ name: 'Invalid Body', message: err.errors });
    return;
  }

  if (err instanceof HttpError) {
    // If the error is an instance of HttpError, use the provided status code
    res.status(err.status);
    res.json({ name: err.name, message: err.message });
    return;
  }

  // For other errors, use the 500 Internal Server Error status code
  console.error(err);
  res.status(500);
  res.json({ name: 'Internal Server Error' });
}

// Error handler for 404 Not Found
export function errorNotFoundHandler(_req: Request, _res: Response): void {
  throw new HttpError('Not Found', 'Route Not Found', 404);
}
