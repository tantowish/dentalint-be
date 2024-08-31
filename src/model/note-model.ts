import { DailyNote } from "@prisma/client"
import moment from "moment-timezone"
import { timezone } from "../util/timezone"

export type NoteResponse = {
    id: number
    user_id: number
    title ?: string
    times: string[]
    fnb: string
    note ?: string
    created_at: string
}

export type NoteRequest = {
    title ?: string
    times: string[]
    fnb: string
    note ?: string
}

export function toNoteResponse(note: DailyNote): NoteResponse {
    return {
        id: note.id,
        user_id: note.user_id,
        title: note.title,
        times: note.times,
        fnb: note.fnb,
        note: note.note!,
        created_at: moment(note.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
    }
}
export function toNoteArrayResponse(notes: DailyNote[]): NoteResponse[] {
    return notes.map(note => ({
        id: note.id,
        user_id: note.user_id,
        title: note.title,
        times: note.times,
        fnb: note.fnb,
        note: note.note!,
        created_at: moment(note.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
    }))
}
