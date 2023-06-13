import type { NextFunction, Request, Response } from 'express';

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.status(401).json({ message: 'Unauthorized' });
}
