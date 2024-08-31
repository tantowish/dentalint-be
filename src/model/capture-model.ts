import { Capture, Classification } from "@prisma/client"
import { timezone } from "../util/timezone"
import moment from "moment-timezone"

export type CaptureResponse = {
    id: number,
    user_id: number,
    image: string,
    class: Classification,
    result: string,
    created_at: string
}

export type CaptureRequest = {
    image: File
}

export function toCaptureResponse(capture: Capture): CaptureResponse{
    return {
        id: capture.id,
        user_id: capture.user_id,
        image: capture.image,
        class: capture.class,
        result: capture.result,
        created_at: moment(capture.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }
}

export function toCaptureArrayResponse(captures: Capture[]): CaptureResponse[]{
    return captures.map(capture => ({
        id: capture.id,
        user_id: capture.user_id,
        image: capture.image,
        class: capture.class,
        result: capture.result,
        created_at: moment(capture.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }))
}