import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { AppointmentRequest } from "../model/appointment-model";
import { AppoinmentService } from "../service/appointment-service";
import { User } from "@prisma/client";


export class AppoinmentController {
    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try{
            const response = await AppoinmentService.get(req.params.id, req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try{
            const response = await AppoinmentService.list(req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: AppointmentRequest = req.body as AppointmentRequest
            const response = await AppoinmentService.create(request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}