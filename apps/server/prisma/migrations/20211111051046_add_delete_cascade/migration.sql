-- DropForeignKey
ALTER TABLE "MusicianMusic" DROP CONSTRAINT "MusicianMusic_musicId_fkey";

-- AddForeignKey
ALTER TABLE "MusicianMusic" ADD CONSTRAINT "MusicianMusic_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;
