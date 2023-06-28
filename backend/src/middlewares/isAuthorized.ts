import type {
  Comment,
  Post,
  PostKind,
  Role,
  User,
} from '@prisma/client';
import type { NextFunction, RequestHandler, Response } from 'express';
import HttpError from '../utils/HttpError';
import type { AnyPermissions } from '../utils/permissions';
import {
  CommentPermissionActionMap,
  CommentPermissionOwnActionMap,
  GenericAction,
  PermissionSubject,
  PostPermissionActionMap,
  PostPermissionOwnActionMap,
} from '../utils/permissions';
import type { Request } from '../utils/types';

type PermissionField = 'permissionComments' | 'permissionPosts' | 'permissionRoles' | 'permissionTransactions' | 'permissionUsers';
const fieldFromSubject = (subject: PermissionSubject): PermissionField | null =>
  (subject === PermissionSubject.Transaction ? 'permissionTransactions'
    : subject === PermissionSubject.Post ? 'permissionPosts'
    : subject === PermissionSubject.Comment ? 'permissionComments'
    : subject === PermissionSubject.User ? 'permissionUsers'
    : subject === PermissionSubject.Role ? 'permissionRoles'
    : null);

export function isAuthorized(permission: AnyPermissions, subject: PermissionSubject): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const field = fieldFromSubject(subject);
    if (!field)
      throw new Error('Invalid permission subject');

    if (req.user!.roles.some(role => role[field] & permission)) {
      next();
      return;
    }

    throw new HttpError('Forbidden', 'Insufficient permissions', 403);
  };
}

/**
 * Function to assert that a user has permission to perform an action on a post or a comment, depending on the post
 * kind, and whether the post or comment is their own.
 */
export function assertContentPermission(
  user: User & { roles: Role[] },
  action: GenericAction,
  entity: (Post | PostKind | Comment & { post: Post }),
  subject: PermissionSubject,
): void {
  // An action map is a map of all permissions for a given action and post kind
  // We have one for general actions and one for actions on our own entities (e.g. a post we created)
  const actionMap = subject === PermissionSubject.Comment
    ? CommentPermissionActionMap
    : PostPermissionActionMap;
  const ownActionMap = subject === PermissionSubject.Comment
    ? CommentPermissionOwnActionMap
    : PostPermissionOwnActionMap;

  // Find the permission field for the given subject
  const field = fieldFromSubject(subject);
  if (!field)
    throw new Error('Invalid permission subject');

  // Sum of all permissions granted by the user's roles
  const userPermissions = user.roles.reduce((acc, role) => acc | role[field], 0);

  // Find the kind of the entity. Depending on the call site we might have very varying information, so we need to
  // accept many different formats and figure them out here.
  const kind = typeof entity === 'string' ? entity
    : 'kind' in entity ? entity.kind
    : entity.post.kind;

  // Check if the entity is the user's own. Same as the kind, we need to accept many different formats and figure them
  // out here.
  const isOwn = typeof entity !== 'string' && 'authorId' in entity && entity.authorId === user.id;

  // Find the action map to use. If the entity is the user's own, we use the own action map, otherwise the general one.
  const actionMapToUse = isOwn && ownActionMap[action]?.[kind] ? ownActionMap : actionMap;

  // Check if the action map does have an entry for our case
  if (actionMapToUse[action]?.[kind]) {
    // Check if the user has the required permission
    const permission = actionMapToUse[action]![kind]!;
    if ((userPermissions & permission) !== permission)
      throw new HttpError('Forbidden', 'Insufficient permissions', 403);
  } else {
    throw new Error(`No permission mapping for ${GenericAction[action]} action on ${kind}`);
  }
}

// Curry the assertContentPermission function to assert comment permissions (pre-fill the last argument with
// PermissionSubject.Comment)
export const assertCommentPermission = (user: NonNullable<Request['user']>, action: GenericAction, entity: Post | (Comment & { post: Post })): void => {
  assertContentPermission(user, action, entity, PermissionSubject.Comment);
};

// Curry the assertContentPermission function to assert post permissions (pre-fill the last argument with
// PermissionSubject.Post)
export const assertPostPermission = (user: NonNullable<Request['user']>, action: GenericAction, entity: Post | PostKind): void => {
  assertContentPermission(user, action, entity, PermissionSubject.Post);
};
