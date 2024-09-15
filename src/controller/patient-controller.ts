import { NextFunction, Response } from "express";
import { PatientRequest } from "../model/patient-model";
import { PatientService } from "../service/patient-service";
import { UserRequest } from "../types/user-request";
import { User } from "@prisma/client";

export class PatientController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: PatientRequest = req.body as PatientRequest
            const response = await PatientService.create(request, req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }}