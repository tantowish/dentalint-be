import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request";
import { BlogService } from "../service/blog-service";

export class BlogController {
    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try{
            const response = await BlogService.get(req.params.id)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try{
            const response = await BlogService.list()
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}