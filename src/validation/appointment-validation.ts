import { AppointmentSchedule } from "@prisma/client";
import { z, ZodType } from "zod";

export class AppointmentValidation {
    static readonly CREATE: ZodType = z.object({
        rekam_medis: z.string().min(5).max(5),
        clinic_id: z.number().min(1),
        schedule: z.string().min(1),
        status: z.nativeEnum(AppointmentSchedule),
        polyclinic: z.string().min(1),
        payment: z.string().min(1)
    })
}   