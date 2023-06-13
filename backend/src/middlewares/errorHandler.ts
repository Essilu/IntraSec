import type { NextFunction, Response } from 'express';
import createError from 'http-errors';
import { ZodError } from 'zod';
import type { Request } from '../utils/types';

declare type WebError = Error & { status?: number };

export function errorHandler(err: WebError, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ZodError) {
    res.status(400);
    res.json({ name: 'Invalid Body', message: err.errors });
    return;
  }

  res.status(err.status ?? 500);
  res.json({ name: err.name, message: err.message });
}

export function errorNotFoundHandler(req: Request, res: Response, next: NextFunction): void {
  next(createError(404));
}
