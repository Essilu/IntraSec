import type { Role, User } from '@prisma/client';
import type { Request as ExpressRequest } from 'express';

// Custom Request interface that extends ExpressRequest
export interface Request extends ExpressRequest {
  user?: User & { roles: Role[] };
}
