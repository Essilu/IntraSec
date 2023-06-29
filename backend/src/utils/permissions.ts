import { PostKind } from '@prisma/client';

export enum TransactionPermissions {
  CreateTransaction = 1 << 0, // eslint-disable-line unicorn/prefer-math-trunc
  ReadTransaction = 1 << 1,
  UpdateTransaction = 1 << 2,
  DeleteTransaction = 1 << 4,
}

export enum PostPermissions {
  // Posts: Marketing
  CreateMarketingPost = 1 << 0, // eslint-disable-line unicorn/prefer-math-trunc
  ReadMarketingPost = 1 << 1,
  UpdateMarketingPost = 1 << 2,
  UpdateOwnMarketingPost = 1 << 3,
  DeleteMarketingPost = 1 << 4,
  DeleteOwnMarketingPost = 1 << 5,

  // Posts: Support
  CreateSupportPost = 1 << 6,
  ReadSupportPost = 1 << 7,
  UpdateSupportPost = 1 << 8,
  UpdateOwnSupportPost = 1 << 9,
  DeleteSupportPost = 1 << 10,
  DeleteOwnSupportPost = 1 << 11,

  // Posts: Partner
  CreatePartnerPost = 1 << 12,
  ReadPartnerPost = 1 << 13,
  UpdatePartnerPost = 1 << 14,
  UpdateOwnPartnerPost = 1 << 15,
  DeletePartnerPost = 1 << 16,
  DeleteOwnPartnerPost = 1 << 17,
}

export enum CommentPermissions {
  // Comments: Marketing
  CreateMarketingComment = 1 << 0, // eslint-disable-line unicorn/prefer-math-trunc
  ReadMarketingComment = 1 << 1,
  UpdateMarketingComment = 1 << 2,
  UpdateOwnMarketingComment = 1 << 3,
  DeleteMarketingComment = 1 << 4,
  DeleteOwnMarketingComment = 1 << 5,

  // Comments: Support
  CreateSupportComment = 1 << 6,
  ReadSupportComment = 1 << 7,
  UpdateSupportComment = 1 << 8,
  UpdateOwnSupportComment = 1 << 9,
  DeleteSupportComment = 1 << 10,
  DeleteOwnSupportComment = 1 << 11,

  // No comments for partner posts
}

export enum UserPermissions {
  CreateUser = 1 << 0, // eslint-disable-line unicorn/prefer-math-trunc
  ReadUser = 1 << 1,
  UpdateUser = 1 << 2,
  DeleteUser = 1 << 3,
}

export enum RolePermissions {
  CreateRole = 1 << 0, // eslint-disable-line unicorn/prefer-math-trunc
  ReadRole = 1 << 1,
  UpdateRole = 1 << 2,
  DeleteRole = 1 << 3,
}

/* HELPERS */

export type AnyPermissions =
  | CommentPermissions
  | PostPermissions
  | RolePermissions
  | TransactionPermissions
  | UserPermissions;

export enum PermissionSubject {
  Transaction = 'transaction',
  Post = 'post',
  Comment = 'comment',
  User = 'user',
  Role = 'role',
}

export enum GenericAction {
  Create,
  Read,
  Update,
  Delete,
}

export const PostPermissionActionMap: Record<GenericAction, Record<PostKind, PostPermissions>> = {
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

export const PostPermissionOwnActionMap: Partial<typeof PostPermissionActionMap> = {
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

export const CommentPermissionActionMap: Record<GenericAction, Partial<Record<PostKind, CommentPermissions>>> = {
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

export const CommentPermissionOwnActionMap: Partial<typeof CommentPermissionActionMap> = {
  [GenericAction.Update]: {
    [PostKind.MARKETING_POST]: CommentPermissions.UpdateOwnMarketingComment,
    [PostKind.SUPPORT_TICKET]: CommentPermissions.UpdateOwnSupportComment,
  },
  [GenericAction.Delete]: {
    [PostKind.MARKETING_POST]: CommentPermissions.DeleteOwnMarketingComment,
    [PostKind.SUPPORT_TICKET]: CommentPermissions.DeleteOwnSupportComment,
  },
};
