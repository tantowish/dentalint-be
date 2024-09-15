import { Clinic } from "@prisma/client"
import moment from "moment-timezone"
import { timezone } from "../util/timezone"

export type ClinicResponse = {
    id: number,
    clinic_name: string,
    latitude: string,
    longitude: string,
    logo: string,
    address: string,
    link: string,
    created_at: string,
    updated_at:string
}

export function toClinicResponse(clinic: Clinic): ClinicResponse{
    return {
        id: clinic.id,
        clinic_name: clinic.clinic_name,
        latitude: clinic.latitude,
        longitude: clinic.longitude,
        logo: clinic.logo,
        address: clinic.address,
        link: clinic.link,
        created_at: moment(clinic.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(clinic.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
    }
}

export function toClinicArrayResponse(clinics: Clinic[]): ClinicResponse[]{
    return clinics.map(clinic => ({
        id: clinic.id,
        clinic_name: clinic.clinic_name,
        latitude: clinic.latitude,
        longitude: clinic.longitude,
        logo: clinic.logo,
        address: clinic.address,
        link: clinic.link,
        created_at: moment(clinic.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(clinic.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
    }))
}