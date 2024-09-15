import { User } from "@prisma/client";
import { PatientRequest, PatientResponse, toPatientResponse } from "../model/patient-model";
import { Validation } from "../validation/validation";
import { PatientValidation } from "../validation/patient-validation";
import { prismaClient } from "../app/database";
import { generateRekamMedis } from "../util/generate-rm";
import { ClinicService } from "./clinic-service";
import moment from "moment-timezone";

export class PatientService {
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