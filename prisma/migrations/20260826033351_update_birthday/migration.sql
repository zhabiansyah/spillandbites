/*
  Warnings:

  - You are about to drop the column `email` on the `BirthdayBooking` table. All the data in the column will be lost.
  - Added the required column `branch` to the `BirthdayBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kidsCount` to the `BirthdayBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `BirthdayBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BirthdayBooking" DROP COLUMN "email",
ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "kidsCount" INTEGER NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DEFAULT 'Menunggu Konfirmasi';
