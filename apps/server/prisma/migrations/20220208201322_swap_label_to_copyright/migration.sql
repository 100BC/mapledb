/*
  Warnings:

  - You are about to drop the column `labelId` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_labelId_fkey";

-- AlterTable
ALTER TABLE "Music" DROP COLUMN "labelId",
ADD COLUMN     "copyright" VARCHAR(255);

-- DropTable
DROP TABLE "Label";
