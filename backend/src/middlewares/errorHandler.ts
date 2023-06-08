import type { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

declare type WebError = Error & { status?: number };

export function errorHandler(err: WebError, req: Request, res: Response, _next: NextFunction): void {
  res.status(err.status ?? 500);
  res.json({ name: err.name, message: err.message });
}

export function errorNotFoundHandler(req: Request, res: Response, next: NextFunction): void {
  next(createError(404));
}
