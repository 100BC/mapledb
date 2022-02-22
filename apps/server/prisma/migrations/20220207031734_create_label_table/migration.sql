-- AlterTable
ALTER TABLE "Music" ADD COLUMN     "labelId" SMALLINT;

-- CreateTable
CREATE TABLE "Label" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Label_name_key" ON "Label"("name");

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE SET NULL ON UPDATE CASCADE;
