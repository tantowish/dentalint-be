import { GolonganDarah, JenisKelamin } from "@prisma/client";
import { z, ZodType } from "zod";

export class PatientValidation {
    static readonly CREATE: ZodType = z.object({
        clinic_id: z.number().min(1),
        name: z.string().min(1),
        nik: z.string().min(16).max(16),
        jenis_kelamin: z.nativeEnum(JenisKelamin),
        golongan_darah: z.nativeEnum(GolonganDarah),
        tempat_lahir: z.string().min(1),
        tanggal_lahir: z.string().min(1),
        alamat: z.string(),
        no_hp: z.string().min(11).max(13)
    })
}   