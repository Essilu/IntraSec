export const PermissionTable = {
  'transactions.create': 1 << 0,
  'transactions.read': 1 << 1,
  'transactions.update': 1 << 2,
  'transactions.delete': 1 << 3,

  'posts.marketing.create': 1 << 0,
  'posts.marketing.read': 1 << 1,
  'posts.marketing.update': 1 << 2,
  'posts.marketing.update-own': 1 << 3,
  'posts.marketing.delete': 1 << 4,
  'posts.marketing.delete-own': 1 << 5,

  'posts.support.create': 1 << 6,
  'posts.support.read': 1 << 7,
  'posts.support.update': 1 << 8,
  'posts.support.update-own': 1 << 9,
  'posts.support.delete': 1 << 10,
  'posts.support.delete-own': 1 << 11,

  'posts.partner.create': 1 << 12,
  'posts.partner.read': 1 << 13,
  'posts.partner.update': 1 << 14,
  'posts.partner.update-own': 1 << 15,
  'posts.partner.delete': 1 << 16,
  'posts.partner.delete-own': 1 << 17,

  'comments.marketing.create': 1 << 0,
  'comments.marketing.read': 1 << 1,
  'comments.marketing.update': 1 << 2,
  'comments.marketing.update-own': 1 << 3,
  'comments.marketing.delete': 1 << 4,
  'comments.marketing.delete-own': 1 << 5,

  'comments.support.create': 1 << 6,
  'comments.support.read': 1 << 7,
  'comments.support.update': 1 << 8,
  'comments.support.update-own': 1 << 9,
  'comments.support.delete': 1 << 10,
  'comments.support.delete-own': 1 << 11,

  'users.create': 1 << 0,
  'users.read': 1 << 1,
  'users.update': 1 << 2,
  'users.delete': 1 << 3,

  'roles.create': 1 << 0,
  'roles.read': 1 << 1,
  'roles.update': 1 << 2,
  'roles.delete': 1 << 3,
};

export const getPermissionNames = (role, scope, subscope) => {
  const permissions = [];
  const permission = role[`permission${scope}`];
  if (subscope) {
    const offset = subscope === 'marketing' ? 0 : subscope === 'support' ? 6 : 12;
    if (permission & (1 << (offset + 0))) permissions.push(`${scope.toLowerCase()}.${subscope}.create`);
    if (permission & (1 << (offset + 1))) permissions.push(`${scope.toLowerCase()}.${subscope}.read`);
    if (permission & (1 << (offset + 2))) permissions.push(`${scope.toLowerCase()}.${subscope}.update`);
    if (permission & (1 << (offset + 3))) permissions.push(`${scope.toLowerCase()}.${subscope}.update-own`);
    if (permission & (1 << (offset + 4))) permissions.push(`${scope.toLowerCase()}.${subscope}.delete`);
    if (permission & (1 << (offset + 5))) permissions.push(`${scope.toLowerCase()}.${subscope}.delete-own`);
  } else {
    if (permission & (1 << 0)) permissions.push(`${scope.toLowerCase()}.create`);
    if (permission & (1 << 1)) permissions.push(`${scope.toLowerCase()}.read`);
    if (permission & (1 << 2)) permissions.push(`${scope.toLowerCase()}.update`);
    if (permission & (1 << 3)) permissions.push(`${scope.toLowerCase()}.delete`);
  }

  return permissions;
};

export const serializePermissionValues = (roles) => {
  const permissions = {};
  roles.forEach((role) => {
    permissions[role.id] = {};
    permissions[role.id].transactions = getPermissionNames(role, 'Transactions');
    (permissions[role.id].posts = [
      ...getPermissionNames(role, 'Posts', 'marketing'),
      ...getPermissionNames(role, 'Posts', 'support'),
      ...getPermissionNames(role, 'Posts', 'partner'),
    ]),
      (permissions[role.id].comments = [
        ...getPermissionNames(role, 'Comments', 'marketing'),
        ...getPermissionNames(role, 'Comments', 'support'),
      ]),
      (permissions[role.id].users = getPermissionNames(role, 'Users'));
    permissions[role.id].roles = getPermissionNames(role, 'Roles');
  });
  return permissions;
};

export const deserializePermissionValues = (values) => {
  const roles = [];
  Object.entries(values).forEach(([id, value]) => {
    const role = {
      id: Number(id),
      permissionTransactions: 0,
      permissionPosts: 0,
      permissionComments: 0,
      permissionUsers: 0,
      permissionRoles: 0,
    };

    value.transactions.forEach((permission) => (role.permissionTransactions |= PermissionTable[permission]));
    value.posts.forEach((permission) => (role.permissionPosts |= PermissionTable[permission]));
    value.comments.forEach((permission) => (role.permissionComments |= PermissionTable[permission]));
    value.users.forEach((permission) => (role.permissionUsers |= PermissionTable[permission]));
    value.roles.forEach((permission) => (role.permissionRoles |= PermissionTable[permission]));

    roles.push(role);
  });
  return roles;
};
