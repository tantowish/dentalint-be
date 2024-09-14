/*
  Warnings:

  - You are about to drop the `Appoinment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appoinment" DROP CONSTRAINT "Appoinment_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "Appoinment" DROP CONSTRAINT "Appoinment_rekam_medis_fkey";

-- DropTable
DROP TABLE "Appoinment";

-- CreateTable
CREATE TABLE "appointments" (
    "id" VARCHAR(6) NOT NULL,
    "rekam_medis" TEXT NOT NULL,
    "clinic_id" INTEGER NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentSchedule" NOT NULL,
    "polyclinic" VARCHAR(255) NOT NULL,
    "paymet" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_rekam_medis_fkey" FOREIGN KEY ("rekam_medis") REFERENCES "patients"("rekam_medis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
