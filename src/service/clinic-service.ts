import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { ClinicResponse, toClinicArrayResponse, toClinicResponse } from "../model/clinic-model";

export class ClinicService {
    static async get(id: number): Promise<ClinicResponse> {
        if (!id) {
            throw new ResponseErorr(400, "id is invalid")
        }
        const clinic = await prismaClient.clinic.findUnique({
            where:{
                id: id
            }
        })

        if (!clinic) {
            throw new ResponseErorr(404, "clinic not found")
        }

        return toClinicResponse(clinic)
    } 

    static async list(): Promise<ClinicResponse[]> {
        const clinics = await prismaClient.clinic.findMany()

        return toClinicArrayResponse(clinics)
    } 
}