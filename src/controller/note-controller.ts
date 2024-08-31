import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request";
import { NoteService } from "../service/note-service";
import { NoteRequest } from "../model/note-model";
import { User } from "@prisma/client";

export class NoteController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try{
            const request: NoteRequest = req.body as NoteRequest
            const response = await NoteService.create(request, req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try{
            const response = await NoteService.get(parseInt(req.params.id), req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try{
            const response = await NoteService.list(req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}