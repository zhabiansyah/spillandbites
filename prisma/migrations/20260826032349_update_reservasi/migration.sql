/*
  Warnings:

  - You are about to drop the column `email` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `branch` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "email",
ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DEFAULT 'Menunggu Konfirmasi';
