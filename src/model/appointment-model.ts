import { Appoinment, AppointmentSchedule, GolonganDarah, JenisKelamin, Patient } from "@prisma/client"
import moment from "moment-timezone"
import { timezone } from "../util/timezone"
import { ClinicResponse } from "./clinic-model"

export type AppointmentResponse = {
    no_antrian: string,
    rekam_medis: string,
    clinic_id: number,
    schedule: string,
    status: AppointmentSchedule,
    polyclinic: string,
    payment: string,
    created_at: string,
    updated_at: string
}

export type AppointmentResponseDetail = {
    no_antrian: string,
    rekam_medis: string,
    clinic_id: number,
    schedule: string,
    status: AppointmentSchedule,
    polyclinic: string,
    payment: string,
    created_at: string,
    updated_at: string,
    clinic: ClinicResponse
}

export type AppointmentRequest = {
    rekam_medis: string,
    clinic_id: number,
    schedule: string,
    status: AppointmentSchedule,
    polyclinic: string,
    payment: string
}

export function toAppointmentResponse(appointment: Appoinment): AppointmentResponse {
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
    }
}

export function toAppointmentResponseDetail(appointment: Appoinment): AppointmentResponse {
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
    }
}

export function toAppointmentResponseArray(appointment: Appoinment): AppointmentResponse {
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
    }
}