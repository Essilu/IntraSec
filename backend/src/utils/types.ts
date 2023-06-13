import type { User } from '@prisma/client';
import type { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
  user?: User;
}
