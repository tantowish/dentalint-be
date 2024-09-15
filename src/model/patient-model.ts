import { GolonganDarah, JenisKelamin, Patient } from "@prisma/client"
import moment from "moment-timezone"
import { timezone } from "../util/timezone"

export type PatientResponse = {
    rekam_medis: string,
    user_id: number,
    clinic_id: number,
    name: string,
    nik: string,
    jenis_kelamin: JenisKelamin,
    golongan_darah: GolonganDarah,
    tempat_lahir: string,
    tanggal_lahir: string,
    alamat: string,
    no_hp: string,
    created_at: string,
    updated_at: string
}

export type PatientRequest = {
    clinic_id: number,
    name: string,
    nik: string,
    jenis_kelamin: JenisKelamin,
    golongan_darah: GolonganDarah,
    tempat_lahir: string,
    tanggal_lahir: string,
    alamat: string,
    no_hp: string,
}

export function toPatientResponse(patient: Patient): PatientResponse {
    return {
        rekam_medis: patient.rekam_medis,
        user_id: patient.user_id,
        clinic_id: patient.clinic_id,
        name: patient.name,
        nik: patient.nik,
        jenis_kelamin: patient.jenis_kelamin,
        golongan_darah: patient.golongan_darah,
        tempat_lahir: patient.tempat_lahir,
        tanggal_lahir: moment(patient.tanggal_lahir).tz(timezone).format('YYYY-MM-DD'),
        alamat: patient.alamat,
        no_hp: patient.no_hp,
        created_at: moment(patient.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(patient.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
    }
}