import type { NextFunction, Request, Response } from 'express';

// Middleware function to ensure that the user is authenticated
export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.isAuthenticated()) {
    // If the user is authenticated, call the next middleware in the chain
    next();
    return;
  }

  // If the user is not authenticated, send a 401 Unauthorized status and a JSON response
  res.status(401).json({ message: 'Unauthorized' });
}
