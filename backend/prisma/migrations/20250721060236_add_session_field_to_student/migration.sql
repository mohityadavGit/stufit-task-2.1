/*
  Warnings:

  - The `role` column on the `AdminLogin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'HOD');

-- AlterTable
ALTER TABLE "AdminLogin" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "admission_date" TIMESTAMP(3),
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "grade" TEXT,
ADD COLUMN     "session" TEXT;
