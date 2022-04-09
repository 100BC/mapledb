-- RenameForeignKey
ALTER TABLE "music" RENAME CONSTRAINT "music_subgenreId_fkey" TO "music_subgenre_id_fkey";

-- RenameForeignKey
ALTER TABLE "musician" RENAME CONSTRAINT "musician_cityId_fkey" TO "musician_city_id_fkey";

-- RenameForeignKey
ALTER TABLE "musician_music" RENAME CONSTRAINT "musician_music_musicId_fkey" TO "musician_music_music_id_fkey";

-- RenameForeignKey
ALTER TABLE "musician_music" RENAME CONSTRAINT "musician_music_musicianId_fkey" TO "musician_music_musician_id_fkey";

-- RenameIndex
ALTER INDEX "music_appleLink_key" RENAME TO "music_apple_link_key";

-- RenameIndex
ALTER INDEX "music_bandcampLink_key" RENAME TO "music_bandcamp_link_key";

-- RenameIndex
ALTER INDEX "music_musicType_release_idx" RENAME TO "music_music_type_release_idx";

-- RenameIndex
ALTER INDEX "music_soundcloudLink_key" RENAME TO "music_soundcloud_link_key";

-- RenameIndex
ALTER INDEX "music_spotifyLink_key" RENAME TO "music_spotify_link_key";

-- RenameIndex
ALTER INDEX "music_youtubeLink_key" RENAME TO "music_youtube_link_key";

-- RenameIndex
ALTER INDEX "musician_appleLink_key" RENAME TO "musician_apple_link_key";

-- RenameIndex
ALTER INDEX "musician_bandcampLink_key" RENAME TO "musician_bandcamp_link_key";

-- RenameIndex
ALTER INDEX "musician_soundcloudLink_key" RENAME TO "musician_soundcloud_link_key";

-- RenameIndex
ALTER INDEX "musician_spotifyLink_key" RENAME TO "musician_spotify_link_key";

-- RenameIndex
ALTER INDEX "musician_youtubeLink_key" RENAME TO "musician_youtube_link_key";
