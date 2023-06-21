import type { NextFunction, Response } from 'express';
import passport from 'passport';
import { safeUser } from '../utils/safeUser';
import type { Request } from '../utils/types';
import { loginUser } from '../validators/auth';

export function logIn(req: Request, res: Response, next: NextFunction): void {
  loginUser.parse(req.body);
  passport.authenticate('local', { successMessage: 'Logged In' })(req, res, next);
}

export function me(req: Request, res: Response): void {
  res.status(200).json(safeUser(req.user!));
}

export function logOut(req: Request, res: Response): void {
  req.logOut((err) => {
    if (err)
      res.status(500).json({ message: 'Error logging out' });
    else
      res.status(200).json({ message: 'Logged Out' });
  });
}
