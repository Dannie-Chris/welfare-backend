/*
  Warnings:

  - You are about to drop the column `memberForm` on the `Contribution` table. All the data in the column will be lost.
  - You are about to drop the column `memberName` on the `Contribution` table. All the data in the column will be lost.
  - Made the column `userId` on table `Contribution` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Contribution" DROP CONSTRAINT "Contribution_userId_fkey";

-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "memberForm",
DROP COLUMN "memberName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "reference" TEXT,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "paymentStatus" SET DEFAULT 'Pending';

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
