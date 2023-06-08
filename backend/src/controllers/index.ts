import type { Request, Response } from 'express';

/**
 * GET /
 * Home page.
 */
export function index(req: Request, res: Response): void {
  res.json({ message: 'Welcome to the API !' });
}
