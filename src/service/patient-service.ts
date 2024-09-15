import { User } from "@prisma/client";
import { PatientRequest, PatientResponse, toPatientResponse } from "../model/patient-model";
import { Validation } from "../validation/validation";
import { PatientValidation } from "../validation/patient-validation";
import { prismaClient } from "../app/database";
import { generateRekamMedis } from "../util/generate";
import { ClinicService } from "./clinic-service";
import moment from "moment-timezone";
import { ResponseErorr } from "../error/reponse-error";

export class PatientService {
    static async get(id: string): Promise<PatientResponse>{
        if (!id) {
            throw new ResponseErorr(400, "id is invalid")
        }
        const patient = await prismaClient.patient.findUnique({
            where: {
                rekam_medis: id
            }
        })

        if (!patient){
            throw new ResponseErorr(404, "patient not found")
        }

        return toPatientResponse(patient)
    }

    static async create(req: PatientRequest, user: User): Promise<PatientResponse> {
        const createRequest = Validation.validate(PatientValidation.CREATE, req)

        await ClinicService.get(req.clinic_id)

        const data = {
            rekam_medis: generateRekamMedis(),
            user_id: user.id,
            ...createRequest,
            tanggal_lahir: moment(createRequest.tanggal_lahir, "DD-MM-YYYY").toDate()
        }

        const patient = await prismaClient.patient.create({
            data: data
        })

        return toPatientResponse(patient)
    }
}