/*
  Warnings:

  - You are about to drop the column `link1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `link2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `link3` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hallId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_listingId_fkey";

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "hallId" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "link1",
DROP COLUMN "link2",
DROP COLUMN "link3",
ADD COLUMN     "link" TEXT NOT NULL;

-- DropTable
DROP TABLE "Item";
