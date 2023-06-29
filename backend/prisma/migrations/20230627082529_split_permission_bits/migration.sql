/*
  Warnings:

  - You are about to drop the column `permissions` on the `Role` table. All the data in the column will be lost.
  - Added the required column `permissionsComments` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissionsPosts` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissionsRoles` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissionsTransactions` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissionsUsers` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "permissions",
ADD COLUMN     "permissionComments" INTEGER NOT NULL,
ADD COLUMN     "permissionPosts" INTEGER NOT NULL,
ADD COLUMN     "permissionRoles" INTEGER NOT NULL,
ADD COLUMN     "permissionTransactions" INTEGER NOT NULL,
ADD COLUMN     "permissionUsers" INTEGER NOT NULL;
