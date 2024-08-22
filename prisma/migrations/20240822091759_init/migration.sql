-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('P', 'L');

-- CreateEnum
CREATE TYPE "GolonganDarah" AS ENUM ('O', 'AB', 'A', 'B');

-- CreateEnum
CREATE TYPE "Classification" AS ENUM ('healthy', 'caries');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_datas" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rekam_medis" VARCHAR(6),
    "nik" VARCHAR(16) NOT NULL,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "golongan_darah" "GolonganDarah" NOT NULL,
    "tempat_lahir" VARCHAR(255) NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "no_hp" VARCHAR(13) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_datas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "captures" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "class" "Classification" NOT NULL,
    "result" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "captures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journals" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "journals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "source" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user_datas" ADD CONSTRAINT "user_datas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "captures" ADD CONSTRAINT "captures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journals" ADD CONSTRAINT "journals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
