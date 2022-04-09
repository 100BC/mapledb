-- AlterTable
ALTER TABLE "city" RENAME CONSTRAINT "City_pkey" TO "city_pkey";

-- AlterTable
ALTER TABLE "music" RENAME CONSTRAINT "Music_pkey" TO "music_pkey";

-- AlterTable
ALTER TABLE "musician" RENAME CONSTRAINT "Musician_pkey" TO "musician_pkey";

-- AlterTable
ALTER TABLE "musician_music" RENAME CONSTRAINT "MusicianMusic_pkey" TO "musician_music_pkey";

-- AlterTable
ALTER TABLE "subgenre" RENAME CONSTRAINT "Subgenre_pkey" TO "subgenre_pkey";

-- RenameForeignKey
ALTER TABLE "music" RENAME CONSTRAINT "Music_subgenreId_fkey" TO "music_subgenreId_fkey";

-- RenameForeignKey
ALTER TABLE "musician" RENAME CONSTRAINT "Musician_cityId_fkey" TO "musician_cityId_fkey";

-- RenameForeignKey
ALTER TABLE "musician_music" RENAME CONSTRAINT "MusicianMusic_musicId_fkey" TO "musician_music_musicId_fkey";

-- RenameForeignKey
ALTER TABLE "musician_music" RENAME CONSTRAINT "MusicianMusic_musicianId_fkey" TO "musician_music_musicianId_fkey";

-- RenameIndex
ALTER INDEX "City_name_province_key" RENAME TO "city_name_province_key";

-- RenameIndex
ALTER INDEX "Music_appleLink_key" RENAME TO "music_appleLink_key";

-- RenameIndex
ALTER INDEX "Music_bandcampLink_key" RENAME TO "music_bandcampLink_key";

-- RenameIndex
ALTER INDEX "Music_musicType_release_idx" RENAME TO "music_musicType_release_idx";

-- RenameIndex
ALTER INDEX "Music_soundcloudLink_key" RENAME TO "music_soundcloudLink_key";

-- RenameIndex
ALTER INDEX "Music_spotifyLink_key" RENAME TO "music_spotifyLink_key";

-- RenameIndex
ALTER INDEX "Music_youtubeLink_key" RENAME TO "music_youtubeLink_key";

-- RenameIndex
ALTER INDEX "Musician_appleLink_key" RENAME TO "musician_appleLink_key";

-- RenameIndex
ALTER INDEX "Musician_bandcampLink_key" RENAME TO "musician_bandcampLink_key";

-- RenameIndex
ALTER INDEX "Musician_soundcloudLink_key" RENAME TO "musician_soundcloudLink_key";

-- RenameIndex
ALTER INDEX "Musician_spotifyLink_key" RENAME TO "musician_spotifyLink_key";

-- RenameIndex
ALTER INDEX "Musician_youtubeLink_key" RENAME TO "musician_youtubeLink_key";

-- RenameIndex
ALTER INDEX "Subgenre_name_key" RENAME TO "subgenre_name_key";
