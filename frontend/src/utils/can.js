import { PermissionSubject, PostPermissionActionMap, PostPermissionOwnActionMap, CommentPermissionActionMap, CommentPermissionOwnActionMap } from '../utils/permissions';

const fieldFromSubject = subject =>
  (subject === PermissionSubject.Transaction ? 'permissionTransactions'
    : subject === PermissionSubject.Post ? 'permissionPosts'
    : subject === PermissionSubject.Comment ? 'permissionComments'
    : subject === PermissionSubject.User ? 'permissionUsers'
    : subject === PermissionSubject.Role ? 'permissionRoles'
    : null);

export function can({ user, perform: permission, on: subject }) {
  const field = fieldFromSubject(subject);
  if (!field)
    throw new Error('Invalid permission subject');

  return user.roles.some(role => role[field] & permission);
}

export function canOwn({ user, action, on: subject, entity }) {
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
  const kind = 'kind' in entity ? entity.kind : entity.post.kind;

  // Check if the entity is the user's own. Same as the kind, we need to accept many different formats and figure them
  // out here.
  const isOwn = 'authorId' in entity && entity.authorId === user.id;

  // Find the action map to use. If the entity is the user's own, we use the own action map, otherwise the general one.
  const actionMapToUse = isOwn && ownActionMap[action]?.[kind] ? ownActionMap : actionMap;

  // Check if the action map does have an entry for our case
  if (actionMapToUse[action]?.[kind]) {
    // Check if the user has the required permission
    const permission = actionMapToUse[action][kind];
    if ((userPermissions & permission) !== permission)
      return false;
  } else {
    return false;
  }

  return true;
}
