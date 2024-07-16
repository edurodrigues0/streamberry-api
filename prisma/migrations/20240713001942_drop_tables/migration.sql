/*
  Warnings:

  - You are about to drop the `MovieGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovieStreamig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Streamig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "MovieGenre_movieId_genreId_key";

-- DropIndex
DROP INDEX "MovieStreamig_movieId_streamigId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MovieGenre";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MovieStreamig";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Streamig";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Streaming" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__MovieToStreamig" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MovieToStreamig_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MovieToStreamig_B_fkey" FOREIGN KEY ("B") REFERENCES "Streaming" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__MovieToStreamig" ("A", "B") SELECT "A", "B" FROM "_MovieToStreamig";
DROP TABLE "_MovieToStreamig";
ALTER TABLE "new__MovieToStreamig" RENAME TO "_MovieToStreamig";
CREATE UNIQUE INDEX "_MovieToStreamig_AB_unique" ON "_MovieToStreamig"("A", "B");
CREATE INDEX "_MovieToStreamig_B_index" ON "_MovieToStreamig"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
