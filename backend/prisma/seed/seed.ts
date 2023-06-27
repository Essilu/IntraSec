import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {
  CommentPermissions,
  PermissionHelper,
  PostPermissions,
  TransactionPermissions,
  UserPermissions,
} from '../../src/utils/permissions';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      builtIn: true,
      permissionTransactions: TransactionPermissions.ReadTransaction,
      permissionPosts: PostPermissions.ReadSupportPost
        | PostPermissions.CreateSupportPost
        | PostPermissions.UpdateOwnSupportPost
        | PostPermissions.DeleteOwnSupportPost,
      permissionComments: CommentPermissions.ReadSupportComment
        | CommentPermissions.CreateSupportComment
        | CommentPermissions.UpdateOwnSupportComment
        | CommentPermissions.DeleteOwnSupportComment,
      permissionUsers: UserPermissions.ReadUser,
      permissionRoles: 0,
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      builtIn: true,
      permissionTransactions: PermissionHelper.AllTransactions,
      permissionPosts: PermissionHelper.AllPosts,
      permissionComments: PermissionHelper.AllComments,
      permissionUsers: PermissionHelper.AllUsers,
      permissionRoles: PermissionHelper.AllRoles,
    },
  });

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL! },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL!,
      password: hashedPassword,
      firstname: 'Admin',
      lastname: 'Securecorp',
      roles: {
        connect: [{ id: adminRole.id }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    throw e;
  });
