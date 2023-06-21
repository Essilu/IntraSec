/*
  Warnings:

  - Added the required column `kind` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostKind" AS ENUM ('MARKETING_POST', 'PARTNER_COMPANY', 'PARTNER_SCHOOL', 'SUPPORT_TICKET');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "kind" "PostKind" NOT NULL;
