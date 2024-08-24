import { Classification, User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { CaptureRequest, CaptureResponse, toCaptureResponse } from "../model/capture-model";
import { uploadFile } from "../util/bucket-uploader";
import { detection } from "../util/roboflow";
import { CaptureValidation } from "../validation/capture-validation";
import { Validation } from "../validation/validation";
import { drawPredictions } from "../util/draw-predictions";
import { arrayBufferToBuffer } from "../util/buffer-helper";
import { randomUUID } from "crypto";

export class CaptureService {
    static async create(req: CaptureRequest, user: User): Promise<CaptureResponse>{
        const captureRequest = Validation.validate(CaptureValidation.CREATE, req)

        const data = await detection(captureRequest.image)
        console.log(data)

        const arrayBuffer = await captureRequest.image.arrayBuffer();
        const imageBuffer = await arrayBufferToBuffer(arrayBuffer);
        const drawBox = await drawPredictions(imageBuffer, data);
        const re = /(?:\.([^.]+))?$/;
        const fileExt = re.exec(captureRequest.image.name)?.[0];
        const fileName = `${randomUUID()}${fileExt}`

        const file = new File([drawBox], fileName, { type: 'image/png' });
        const uploadedImage = await uploadFile("capture", file, fileName)
        
        const capture = await prismaClient.capture.create({
            data: {
                user_id: user.id,
                image: uploadedImage,
                class: Classification.caries,
                result: "test"
            }
        })


        return toCaptureResponse(capture)
    }
}