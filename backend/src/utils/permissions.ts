export enum TransactionPermissions {
  CreateTransaction = 1 << 0, // eslint-disable-line unicorn/prefer-math-trunc
  ReadTransaction = 1 << 1,
  UpdateTransaction = 1 << 2,
  UpdateOwnTransaction = 1 << 3,
  DeleteTransaction = 1 << 4,
  DeleteOwnTransaction = 1 << 5,
}

export enum PostPermissions {
  // Posts: Marketing
  CreateMarketingPost = 1 << 0, // eslint-disable-line unicorn/prefer-math-trunc
  ReadMarketingPost = 1 << 1,
  UpdateMarketingPost = 1 << 2,
  UpdateOwnMarketingPost = 1 << 3,
  DeleteMarketingPost = 1 << 4,
  DeleteOwnMarketingPost = 1 << 5,

  // Posts: Partner
  CreatePartnerPost = 1 << 6,
  ReadPartnerPost = 1 << 7,
  UpdatePartnerPost = 1 << 8,
  UpdateOwnPartnerPost = 1 << 9,
  DeletePartnerPost = 1 << 10,
  DeleteOwnPartnerPost = 1 << 11,

  // Posts: Support
  CreateSupportPost = 1 << 12,
  ReadSupportPost = 1 << 13,
  UpdateSupportPost = 1 << 14,
  UpdateOwnSupportPost = 1 << 15,
  DeleteSupportPost = 1 << 16,
  DeleteOwnSupportPost = 1 << 17,
}

export enum CommentPermissions {
  // Comments: Marketing
  CreateMarketingComment = 1 << 0, // eslint-disable-line unicorn/prefer-math-trunc
  ReadMarketingComment = 1 << 1,
  UpdateMarketingComment = 1 << 2,
  UpdateOwnMarketingComment = 1 << 3,
  DeleteMarketingComment = 1 << 4,
  DeleteOwnMarketingComment = 1 << 5,

  // Comments: Partner
  CreatePartnerComment = 1 << 6,
  ReadPartnerComment = 1 << 7,
  UpdatePartnerComment = 1 << 8,
  UpdateOwnPartnerComment = 1 << 9,
  DeletePartnerComment = 1 << 10,
  DeleteOwnPartnerComment = 1 << 11,

  // Comments: Support
  CreateSupportComment = 1 << 12,
  ReadSupportComment = 1 << 13,
  UpdateSupportComment = 1 << 14,
  UpdateOwnSupportComment = 1 << 15,
  DeleteSupportComment = 1 << 16,
  DeleteOwnSupportComment = 1 << 17,
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

/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum PermissionHelper {
  AllTransactions = 63,         // (1 << 6) - 1

  AllMarketingPosts = 63,       // (1 << 6) - 1

  AllPartnerPosts = 4032,       // (1 << 6 - 1) << 6
  AllSupportPosts = 258_048,    // (1 << 6 - 1) << 12
  AllPosts = 262_143,           // (1 << 18) - 1

  AllMarketingComments = 63,    // (1 << 6) - 1
  AllPartnerComments = 4032,    // (1 << 6 - 1) << 6
  AllSupportComments = 258_048, // (1 << 6 - 1) << 12
  AllComments = 262_143,        // (1 << 18) - 1

  AllUsers = 15,                // (1 << 4) - 1

  AllRoles = 15,                // (1 << 4) - 1
}
