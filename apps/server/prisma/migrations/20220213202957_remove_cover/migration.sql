/*
  Warnings:

  - You are about to drop the column `cover` on the `Music` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,province]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appleLink]` on the table `Music` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bandcampLink]` on the table `Music` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[soundcloudLink]` on the table `Music` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spotifyLink]` on the table `Music` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[youtubeLink]` on the table `Music` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appleLink]` on the table `Musician` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bandcampLink]` on the table `Musician` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[soundcloudLink]` on the table `Musician` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spotifyLink]` on the table `Musician` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[youtubeLink]` on the table `Musician` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Subgenre` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "City_name_province_key";

-- DropIndex
DROP INDEX "Music_appleLink_key";

-- DropIndex
DROP INDEX "Music_bandcampLink_key";

-- DropIndex
DROP INDEX "Music_musicType_release_idx";

-- DropIndex
DROP INDEX "Music_soundcloudLink_key";

-- DropIndex
DROP INDEX "Music_spotifyLink_key";

-- DropIndex
DROP INDEX "Music_youtubeLink_key";

-- DropIndex
DROP INDEX "Musician_appleLink_key";

-- DropIndex
DROP INDEX "Musician_bandcampLink_key";

-- DropIndex
DROP INDEX "Musician_soundcloudLink_key";

-- DropIndex
DROP INDEX "Musician_spotifyLink_key";

-- DropIndex
DROP INDEX "Musician_youtubeLink_key";

-- DropIndex
DROP INDEX "Subgenre_name_key";

-- AlterTable
ALTER TABLE "Music" DROP COLUMN "cover";

-- CreateIndex
CREATE UNIQUE INDEX "City_name_province_key" ON "City"("name", "province");

-- CreateIndex
CREATE UNIQUE INDEX "Music_appleLink_key" ON "Music"("appleLink");

-- CreateIndex
CREATE UNIQUE INDEX "Music_bandcampLink_key" ON "Music"("bandcampLink");

-- CreateIndex
CREATE UNIQUE INDEX "Music_soundcloudLink_key" ON "Music"("soundcloudLink");

-- CreateIndex
CREATE UNIQUE INDEX "Music_spotifyLink_key" ON "Music"("spotifyLink");

-- CreateIndex
CREATE UNIQUE INDEX "Music_youtubeLink_key" ON "Music"("youtubeLink");

-- CreateIndex
CREATE INDEX "Music_musicType_release_idx" ON "Music"("musicType", "release" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Musician_appleLink_key" ON "Musician"("appleLink");

-- CreateIndex
CREATE UNIQUE INDEX "Musician_bandcampLink_key" ON "Musician"("bandcampLink");

-- CreateIndex
CREATE UNIQUE INDEX "Musician_soundcloudLink_key" ON "Musician"("soundcloudLink");

-- CreateIndex
CREATE UNIQUE INDEX "Musician_spotifyLink_key" ON "Musician"("spotifyLink");

-- CreateIndex
CREATE UNIQUE INDEX "Musician_youtubeLink_key" ON "Musician"("youtubeLink");

-- CreateIndex
CREATE UNIQUE INDEX "Subgenre_name_key" ON "Subgenre"("name");
