/*
  Warnings:

  - You are about to drop the column `actual_return_date` on the `borrow` table. All the data in the column will be lost.
  - Added the required column `userRole` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `borrow` DROP COLUMN `actual_return_date`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `userRole` ENUM('admin', 'user') NOT NULL;

-- CreateTable
CREATE TABLE `returnRecord` (
    `return_id` INTEGER NOT NULL AUTO_INCREMENT,
    `borrow_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL DEFAULT 0,
    `item_id` INTEGER NOT NULL DEFAULT 0,
    `actual_return_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `returnRecord_borrow_id_key`(`borrow_id`),
    PRIMARY KEY (`return_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `returnRecord` ADD CONSTRAINT `returnRecord_borrow_id_fkey` FOREIGN KEY (`borrow_id`) REFERENCES `borrow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `returnRecord` ADD CONSTRAINT `returnRecord_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `returnRecord` ADD CONSTRAINT `returnRecord_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `inventory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
