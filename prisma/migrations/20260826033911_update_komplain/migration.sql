/*
  Warnings:

  - You are about to drop the column `customer` on the `Complaint` table. All the data in the column will be lost.
  - The `status` column on the `Complaint` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `email` to the `Complaint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Complaint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderNumber` to the `Complaint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Complaint" DROP COLUMN "customer",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "orderNumber" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Baru';

-- DropEnum
DROP TYPE "ComplaintStatus";
