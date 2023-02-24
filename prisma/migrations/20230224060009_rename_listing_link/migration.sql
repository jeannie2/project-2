/*
  Warnings:

  - You are about to drop the column `link` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `linkIframe` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing"
RENAME COLUMN "link" TO "linkIframe";
