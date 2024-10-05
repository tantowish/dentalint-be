import { Classification, User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { CaptureRequest, CaptureResponse, toCaptureArrayResponse, toCaptureResponse } from "../model/capture-model";
import { uploadFile } from "../util/bucket-uploader";
import { detection } from "../util/roboflow";
import { CaptureValidation } from "../validation/capture-validation";
import { Validation } from "../validation/validation";
import { drawPredictions, evaluatePredictionResult } from "../util/predictions-helper";
import { arrayBufferToBuffer, toBase64 } from "../util/buffer-helper";
import { randomUUID } from "crypto";
import { runImageGemini } from "../util/gemini";
import { ResponseErorr } from "../error/reponse-error";
import { PredicitonResult } from "../types/prediciton";

export class CaptureService {
    static async create(req: CaptureRequest, user: User): Promise<CaptureResponse>{
        const captureRequest = Validation.validate(CaptureValidation.CREATE, req)

        const data = await detection(captureRequest.image)
        console.log(data)

        const arrayBuffer = await captureRequest.image.arrayBuffer();
        const imageBuffer = await arrayBufferToBuffer(arrayBuffer);
        const drawBox = await drawPredictions(imageBuffer, data as PredicitonResult);
        const re = /(?:\.([^.]+))?$/;
        const fileExt = re.exec(captureRequest.image.name)?.[0]!;
        const fileName = `${randomUUID()}${fileExt}`

        const file = new File([drawBox], fileName, { type: 'image/png' });
        const uploadedImage = await uploadFile("capture", file, fileName)
        
        const imageUrl = `${process.env.BUCKER_URL}${uploadedImage}`

        const geminiRes = await runImageGemini(file)

        const type = evaluatePredictionResult(data)
        const capture = await prismaClient.capture.create({
            data: {
                user_id: user.id,
                image: imageUrl,
                class: type,
                result: geminiRes
            }
        })


        return toCaptureResponse(capture)
    }

    static async get(id: number, user: User): Promise<CaptureResponse> {
        if (!id) {
            throw new ResponseErorr(400, "id is invalid")
        }
        const capture = await prismaClient.capture.findUnique({
            where: {
                id: id,
                user_id: user.id
            }
        })

        if(!capture) {
            throw new ResponseErorr(404, "capture not found")
        }

        return toCaptureResponse(capture)
    }

    static async list(user: User): Promise<CaptureResponse[]> {
        const captures = await prismaClient.capture.findMany({
            where: {
                user_id: user.id
            },
            orderBy: {
                created_at: "desc"
            }
        })

        return toCaptureArrayResponse(captures)
    }
}