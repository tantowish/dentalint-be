import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CaptureRequest } from "../model/capture-model";
import { CaptureService } from "../service/capture-service";
import { User } from "@prisma/client";

export class CaptureController{
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CaptureRequest = req.body as CaptureRequest
            request.image = new File([req.file?.buffer!], req.file?.originalname!, { type: 'image/jpeg' })
            const response = await CaptureService.create(request, req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await CaptureService.get(parseInt(req.params.id), req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await CaptureService.list(req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}