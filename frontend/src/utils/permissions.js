export const TransactionPermissions = {
  CreateTransaction: 1 << 0,
  ReadTransaction: 1 << 1,
  UpdateTransaction: 1 << 2,
  DeleteTransaction: 1 << 4,
}

export const PostPermissions = {
  // Posts: Marketing
  CreateMarketingPost: 1 << 0,
  ReadMarketingPost: 1 << 1,
  UpdateMarketingPost: 1 << 2,
  UpdateOwnMarketingPost: 1 << 3,
  DeleteMarketingPost: 1 << 4,
  DeleteOwnMarketingPost: 1 << 5,

  // Posts: Support
  CreateSupportPost: 1 << 6,
  ReadSupportPost: 1 << 7,
  UpdateSupportPost: 1 << 8,
  UpdateOwnSupportPost: 1 << 9,
  DeleteSupportPost: 1 << 10,
  DeleteOwnSupportPost: 1 << 11,

  // Posts: Partner
  CreatePartnerPost: 1 << 12,
  ReadPartnerPost: 1 << 13,
  UpdatePartnerPost: 1 << 14,
  UpdateOwnPartnerPost: 1 << 15,
  DeletePartnerPost: 1 << 16,
  DeleteOwnPartnerPost: 1 << 17,
}

export const CommentPermissions = {
  // Comments: Marketing
  CreateMarketingComment: 1 << 0,
  ReadMarketingComment: 1 << 1,
  UpdateMarketingComment: 1 << 2,
  UpdateOwnMarketingComment: 1 << 3,
  DeleteMarketingComment: 1 << 4,
  DeleteOwnMarketingComment: 1 << 5,

  // Comments: Support
  CreateSupportComment: 1 << 6,
  ReadSupportComment: 1 << 7,
  UpdateSupportComment: 1 << 8,
  UpdateOwnSupportComment: 1 << 9,
  DeleteSupportComment: 1 << 10,
  DeleteOwnSupportComment: 1 << 11,

  // No comments for partner posts
}

export const UserPermissions = {
  CreateUser: 1 << 0,
  ReadUser: 1 << 1,
  UpdateUser: 1 << 2,
  DeleteUser: 1 << 3,
}

export const RolePermissions = {
  CreateRole: 1 << 0,
  ReadRole: 1 << 1,
  UpdateRole: 1 << 2,
  DeleteRole: 1 << 3,
}

/* HELPERS */
export const PermissionSubject = {
  Transaction: 'transaction',
  Post: 'post',
  Comment: 'comment',
  User: 'user',
  Role: 'role',
}

export const GenericAction = {
  Create: 'create',
  Read: 'read',
  Update: 'update',
  Delete: 'delete',
}

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

export const PostKind = {
  MARKETING_POST: 'MARKETING_POST',
  PARTNER_COMPANY: 'PARTNER_COMPANY',
  PARTNER_SCHOOL: 'PARTNER_SCHOOL',
  SUPPORT_TICKET: 'SUPPORT_TICKET'
};

export const PostPermissionActionMap = {
  [GenericAction.Create]: {
    [PostKind.MARKETING_POST]: PostPermissions.CreateMarketingPost,
    [PostKind.SUPPORT_TICKET]: PostPermissions.CreateSupportPost,
    [PostKind.PARTNER_COMPANY]: PostPermissions.CreatePartnerPost,
    [PostKind.PARTNER_SCHOOL]: PostPermissions.CreatePartnerPost,
  },
  [GenericAction.Read]: {
    [PostKind.MARKETING_POST]: PostPermissions.ReadMarketingPost,
    [PostKind.SUPPORT_TICKET]: PostPermissions.ReadSupportPost,
    [PostKind.PARTNER_COMPANY]: PostPermissions.ReadPartnerPost,
    [PostKind.PARTNER_SCHOOL]: PostPermissions.ReadPartnerPost,
  },
  [GenericAction.Update]: {
    [PostKind.MARKETING_POST]: PostPermissions.UpdateMarketingPost,
    [PostKind.SUPPORT_TICKET]: PostPermissions.UpdateSupportPost,
    [PostKind.PARTNER_COMPANY]: PostPermissions.UpdatePartnerPost,
    [PostKind.PARTNER_SCHOOL]: PostPermissions.UpdatePartnerPost,
  },
  [GenericAction.Delete]: {
    [PostKind.MARKETING_POST]: PostPermissions.DeleteMarketingPost,
    [PostKind.SUPPORT_TICKET]: PostPermissions.DeleteSupportPost,
    [PostKind.PARTNER_COMPANY]: PostPermissions.DeletePartnerPost,
    [PostKind.PARTNER_SCHOOL]: PostPermissions.DeletePartnerPost,
  },
};

export const PostPermissionOwnActionMap = {
  [GenericAction.Update]: {
    [PostKind.MARKETING_POST]: PostPermissions.UpdateOwnMarketingPost,
    [PostKind.SUPPORT_TICKET]: PostPermissions.UpdateOwnSupportPost,
    [PostKind.PARTNER_COMPANY]: PostPermissions.UpdateOwnPartnerPost,
    [PostKind.PARTNER_SCHOOL]: PostPermissions.UpdateOwnPartnerPost,
  },
  [GenericAction.Delete]: {
    [PostKind.MARKETING_POST]: PostPermissions.DeleteOwnMarketingPost,
    [PostKind.SUPPORT_TICKET]: PostPermissions.DeleteOwnSupportPost,
    [PostKind.PARTNER_COMPANY]: PostPermissions.DeleteOwnPartnerPost,
    [PostKind.PARTNER_SCHOOL]: PostPermissions.DeleteOwnPartnerPost,
  },
};

export const CommentPermissionActionMap = {
  [GenericAction.Create]: {
    [PostKind.MARKETING_POST]: CommentPermissions.CreateMarketingComment,
    [PostKind.SUPPORT_TICKET]: CommentPermissions.CreateSupportComment,
  },
  [GenericAction.Read]: {
    [PostKind.MARKETING_POST]: CommentPermissions.ReadMarketingComment,
    [PostKind.SUPPORT_TICKET]: CommentPermissions.ReadSupportComment,
  },
  [GenericAction.Update]: {
    [PostKind.MARKETING_POST]: CommentPermissions.UpdateMarketingComment,
    [PostKind.SUPPORT_TICKET]: CommentPermissions.UpdateSupportComment,
  },
  [GenericAction.Delete]: {
    [PostKind.MARKETING_POST]: CommentPermissions.DeleteMarketingComment,
    [PostKind.SUPPORT_TICKET]: CommentPermissions.DeleteSupportComment,
  },
};

export const CommentPermissionOwnActionMap = {
  [GenericAction.Update]: {
    [PostKind.MARKETING_POST]: CommentPermissions.UpdateOwnMarketingComment,
    [PostKind.SUPPORT_TICKET]: CommentPermissions.UpdateOwnSupportComment,
  },
  [GenericAction.Delete]: {
    [PostKind.MARKETING_POST]: CommentPermissions.DeleteOwnMarketingComment,
    [PostKind.SUPPORT_TICKET]: CommentPermissions.DeleteOwnSupportComment,
  },
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
