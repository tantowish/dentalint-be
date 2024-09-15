import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request";
import { ClinicService } from "../service/clinic-service";

export class ClinicController {
    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try{
            const response = await ClinicService.get(parseInt(req.params.id))
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try{
            const response = await ClinicService.list()
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}