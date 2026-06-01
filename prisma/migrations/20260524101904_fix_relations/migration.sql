/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Contribution` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Contribution` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Contribution` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `memberForm` to the `Contribution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberName` to the `Contribution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Contribution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contribution" DROP CONSTRAINT "Contribution_userId_fkey";

-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "createdAt",
DROP COLUMN "status",
ADD COLUMN     "memberForm" TEXT NOT NULL,
ADD COLUMN     "memberName" TEXT NOT NULL,
ADD COLUMN     "outstandingBalance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "paymentDate" TEXT,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paymentStatus" TEXT NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE INTEGER,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
