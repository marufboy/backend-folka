/*
  Warnings:

  - You are about to drop the column `author` on the `books` table. All the data in the column will be lost.
  - Added the required column `originStory` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synopsis` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "author",
ADD COLUMN     "originStory" TEXT NOT NULL,
ADD COLUMN     "synopsis" TEXT NOT NULL;
