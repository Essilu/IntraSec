import type { NextFunction, Response } from 'express';
import createError from 'http-errors';
import { ZodError } from 'zod';
import type { Request } from '../utils/types';

// Define a custom type for web errors
declare type WebError = Error & { status?: number };

// Error handler middleware
export function errorHandler(err: WebError, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ZodError) {
    // If the error is an instance of ZodError (from Zod validation), handle it as a 400 Bad Request
    res.status(400);
    res.json({ name: 'Invalid Body', message: err.errors });
    return;
  }

  // For other errors, use the provided status code or default to 500 Internal Server Error
  res.status(err.status ?? 500);
  res.json({ name: err.name, message: err.message });
}

// Error handler for 404 Not Found
export function errorNotFoundHandler(req: Request, res: Response, next: NextFunction): void {
  next(createError(404));
}
