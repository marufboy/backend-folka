/*
  Warnings:

  - You are about to drop the column `downloadLink` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `downloadLink` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "downloadLink" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "downloadLink";
