/*
  Warnings:

  - You are about to drop the column `published` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Article` table. All the data in the column will be lost.
  - Added the required column `author` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `excerpt` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Article_slug_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "published",
DROP COLUMN "slug",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "excerpt" TEXT NOT NULL,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Draft';
