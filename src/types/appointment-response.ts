import { Appoinment } from "@prisma/client";

export interface AppoinmentClinic extends Appoinment {
    clinic: {
        clinic_name: string
    }
}