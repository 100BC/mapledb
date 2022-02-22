-- CreateEnum
CREATE TYPE "Province" AS ENUM ('AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('COUNTRY', 'ELECTRONIC', 'EXPERIMENTAL', 'FOLK', 'JAZZ', 'METAL', 'POP', 'RAP', 'ROCK');

-- CreateEnum
CREATE TYPE "MusicType" AS ENUM ('ALBUM', 'EP', 'SINGLE', 'LIVE', 'OTHER');

-- CreateTable
CREATE TABLE "City" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "province" "Province" NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subgenre" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "genre" "Genre" NOT NULL,

    CONSTRAINT "Subgenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Musician" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "latestRelease" DATE,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cityId" SMALLINT NOT NULL,
    "isGroup" BOOLEAN NOT NULL DEFAULT false,
    "appleLink" VARCHAR(255),
    "bandcampLink" VARCHAR(255),
    "soundcloudLink" VARCHAR(255),
    "spotifyLink" VARCHAR(255),
    "youtubeLink" VARCHAR(255),

    CONSTRAINT "Musician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "musicType" "MusicType" NOT NULL,
    "release" DATE NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cover" VARCHAR(255),
    "instrumental" BOOLEAN NOT NULL DEFAULT false,
    "subgenreId" SMALLINT NOT NULL,
    "nonCanadians" VARCHAR(255)[],
    "appleLink" VARCHAR(255),
    "bandcampLink" VARCHAR(255),
    "soundcloudLink" VARCHAR(255),
    "spotifyLink" VARCHAR(255),
    "youtubeLink" VARCHAR(255),

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicianMusic" (
    "musicianId" VARCHAR(255) NOT NULL,
    "musicId" VARCHAR(255) NOT NULL,

    CONSTRAINT "MusicianMusic_pkey" PRIMARY KEY ("musicianId","musicId")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_province_key" ON "City"("name", "province");

-- CreateIndex
CREATE UNIQUE INDEX "Subgenre_name_key" ON "Subgenre"("name");

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
CREATE UNIQUE INDEX "Music_cover_key" ON "Music"("cover");

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

-- AddForeignKey
ALTER TABLE "Musician" ADD CONSTRAINT "Musician_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_subgenreId_fkey" FOREIGN KEY ("subgenreId") REFERENCES "Subgenre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicianMusic" ADD CONSTRAINT "MusicianMusic_musicianId_fkey" FOREIGN KEY ("musicianId") REFERENCES "Musician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicianMusic" ADD CONSTRAINT "MusicianMusic_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
