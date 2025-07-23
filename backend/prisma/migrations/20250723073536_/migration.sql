-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'HOD');

-- CreateTable
CREATE TABLE "School" (
    "school_id" SERIAL NOT NULL,
    "school_name" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("school_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "adhar_number" TEXT NOT NULL,
    "school_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "session" TEXT,
    "grade" TEXT,
    "gender" TEXT,
    "admission_date" TIMESTAMP(3),
    "dob" TIMESTAMP(3),
    "parent_id" UUID,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "StudentHealthDefect" (
    "defect_id" SERIAL NOT NULL,
    "student_id" UUID NOT NULL,
    "defect_type" TEXT NOT NULL,
    "affected_body_part" TEXT NOT NULL,
    "defect_details" JSONB NOT NULL,
    "severity" TEXT NOT NULL DEFAULT 'Unknown',
    "date_identified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doctor_remarks" TEXT,

    CONSTRAINT "StudentHealthDefect_pkey" PRIMARY KEY ("defect_id")
);

-- CreateTable
CREATE TABLE "AdminLogin" (
    "admin_id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "school_id" INTEGER,

    CONSTRAINT "AdminLogin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "parent_id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("parent_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_username_key" ON "Student"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminLogin_username_key" ON "AdminLogin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AdminLogin_email_key" ON "AdminLogin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_key" ON "Parent"("email");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("school_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Parent"("parent_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentHealthDefect" ADD CONSTRAINT "StudentHealthDefect_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminLogin" ADD CONSTRAINT "AdminLogin_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("school_id") ON DELETE SET NULL ON UPDATE CASCADE;
