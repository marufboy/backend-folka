/*
  Warnings:

  - Added the required column `imageUrl` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "imageUrl" TEXT NOT NULL;
