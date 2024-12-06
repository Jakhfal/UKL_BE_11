/*
  Warnings:

  - Added the required column `userRole` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `userRole` ENUM('admin', 'user') NOT NULL;
