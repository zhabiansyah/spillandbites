/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Promo` table. All the data in the column will be lost.
  - Added the required column `description` to the `Promo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountPercent` to the `Promo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Promo_code_key";

-- AlterTable
ALTER TABLE "Promo" DROP COLUMN "createdAt",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "discountPercent" INTEGER NOT NULL,
ALTER COLUMN "validUntil" SET DATA TYPE TEXT;
