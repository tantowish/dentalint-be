/*
  Warnings:

  - You are about to drop the column `experience_points` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isAnonymous` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `chat_ai` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `discussion_likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `discussions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `journal_ai` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `journals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `practitioners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_datas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat_ai" DROP CONSTRAINT "chat_ai_user_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_discussion_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "discussion_likes" DROP CONSTRAINT "discussion_likes_discussion_id_fkey";

-- DropForeignKey
ALTER TABLE "discussion_likes" DROP CONSTRAINT "discussion_likes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "discussions" DROP CONSTRAINT "discussions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "journal_ai" DROP CONSTRAINT "journal_ai_journal_id_fkey";

-- DropForeignKey
ALTER TABLE "journals" DROP CONSTRAINT "journals_user_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "practitioners" DROP CONSTRAINT "practitioners_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_datas" DROP CONSTRAINT "user_datas_user_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "experience_points",
DROP COLUMN "isAnonymous",
DROP COLUMN "last_name",
DROP COLUMN "role";

-- DropTable
DROP TABLE "chat_ai";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "discussion_likes";

-- DropTable
DROP TABLE "discussions";

-- DropTable
DROP TABLE "journal_ai";

-- DropTable
DROP TABLE "journals";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "practitioners";

-- DropTable
DROP TABLE "user_datas";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Mood";

-- DropEnum
DROP TYPE "Role";
