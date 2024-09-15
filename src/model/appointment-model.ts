import { Appoinment, AppointmentSchedule, GolonganDarah, JenisKelamin, Patient } from "@prisma/client"
import moment from "moment-timezone"
import { timezone } from "../util/timezone"
import { ClinicResponse } from "./clinic-model"
import { AppoinmentClinic } from "../types/appointment-response"

type Clinic = {
    clinic_name: string
}

export type AppointmentResponse = {
    no_antrian: string,
    rekam_medis: string,
    clinic_id: number,
    schedule: string,
    status: AppointmentSchedule,
    polyclinic: string,
    payment: string,
    created_at: string,
    updated_at: string,
    clinic: Clinic
    isDone: boolean
}

export type AppointmentRequest = {
    rekam_medis: string,
    clinic_id: number,
    schedule: string,
    status: AppointmentSchedule,
    polyclinic: string,
    payment: string
}


export function toAppointmentResponse(appointment: AppoinmentClinic): AppointmentResponse {
    const isDone = moment().isAfter(moment(appointment.schedule));
    return {
        no_antrian: appointment.no_antrian,
        rekam_medis: appointment.rekam_medis,
        clinic_id: appointment.clinic_id,
        schedule: moment(appointment.schedule).tz(timezone).format('YYYY-MM-DD HH:mm'),
        status: appointment.status,
        polyclinic: appointment.polyclinic,
        payment: appointment.payment,
        created_at: moment(appointment.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(appointment.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
        clinic: {
            clinic_name: appointment.clinic.clinic_name
        },
        isDone: isDone
    }
}

export function toAppointmentResponseArray(appointments: AppoinmentClinic[]): AppointmentResponse[] {
    return appointments.map(appointment => {
        const isDone = moment().isAfter(moment(appointment.schedule));
        return {
            no_antrian: appointment.no_antrian,
            rekam_medis: appointment.rekam_medis,
            clinic_id: appointment.clinic_id,
            schedule: moment(appointment.schedule).tz(timezone).format('YYYY-MM-DD HH:mm'),
            status: appointment.status,
            polyclinic: appointment.polyclinic,
            payment: appointment.payment,
            created_at: moment(appointment.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment(appointment.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
            clinic: {
                clinic_name: appointment.clinic.clinic_name
            },
            isDone: isDone
        };
    });
}