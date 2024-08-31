import { User } from "@prisma/client"
import { NoteRequest, NoteResponse, toNoteArrayResponse, toNoteResponse } from "../model/note-model"
import { NoteValidation } from "../validation/note-validation"
import { Validation } from "../validation/validation"
import { prismaClient } from "../app/database"
import { ResponseErorr } from "../error/reponse-error"

export class NoteService {
    static async create(req: NoteRequest, user: User): Promise<NoteResponse> {
        const createRequest = Validation.validate(NoteValidation.CREATE, req)

        const data = {
            ...createRequest,
            user_id: user.id,
        }

        console.log(data)
        const note = await prismaClient.dailyNote.create({
            data: data
        })

        return toNoteResponse(note)
    }

    static async get(id: number, user: User): Promise<NoteResponse> {
        if (!id) {
            throw new ResponseErorr(400, "id is invalid")
        }
        const note = await prismaClient.dailyNote.findUnique({
            where: {
                id: id,
                user_id: user.id
            }
        })
        
        if(!note) {
            throw new ResponseErorr(404, "daily note not found")
        }

        return toNoteResponse(note)
    }

    static async list(user: User): Promise<NoteResponse[]> {
        const notes = await prismaClient.dailyNote.findMany({
            where: {
                user_id: user.id
            },
            orderBy: {
                created_at: "desc"
            }
        })

        return toNoteArrayResponse(notes)
    }
}