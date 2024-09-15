import { User } from "@prisma/client";
import { AppointmentRequest, AppointmentResponse, toAppointmentResponse, toAppointmentResponseArray } from "../model/appointment-model";
import { Validation } from "../validation/validation";
import { AppointmentValidation } from "../validation/appointment-validation";
import { ClinicService } from "./clinic-service";
import { PatientService } from "./patient-service";
import { prismaClient } from "../app/database";
import { generateNoAntrian } from "../util/generate";
import { ResponseErorr } from "../error/reponse-error";
import moment from "moment-timezone";

export class AppoinmentService {
    static async get(id: string, user: User): Promise<AppointmentResponse> {
        if (!id) {
            throw new ResponseErorr(400, "id is invalid")
        }

        const appoinment = await prismaClient.appoinment.findUnique({
            where: {
                no_antrian: id,
                patient: {
                    user_id: user.id
                }
            },
            include: {
                clinic: true
            }
        })

        if (!appoinment) {
            throw new ResponseErorr(404, "appointment not found")
        }

        return toAppointmentResponse(appoinment)
    }

    static async list(user: User): Promise<AppointmentResponse[]> {
        const appoinments = await prismaClient.appoinment.findMany({
            where: {
                patient: {
                    user_id: user.id
                }
            },
            include: {
                clinic: true
            }
        })

        return toAppointmentResponseArray(appoinments)
    }

    static async create(req: AppointmentRequest): Promise<AppointmentResponse>{
        const createRequest = Validation.validate(AppointmentValidation.CREATE, req)

        await ClinicService.get(req.clinic_id)

        await PatientService.get(req.rekam_medis)

        const data = {
            no_antrian: generateNoAntrian(),
            ...createRequest,
            schedule: moment(createRequest.schedule, "DD-MM-YYYY HH:mm").toDate()
        }

        const appointment = await prismaClient.appoinment.create({
            data: data,
            include: {
                clinic: true
            }
        })

        return toAppointmentResponse(appointment)
    }
}