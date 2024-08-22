import { Classification, User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { CaptureRequest, CaptureResponse, toCaptureResponse } from "../model/capture-model";
import { uploadFile } from "../util/bucket-uploader";
import { detection } from "../util/roboflow";
import { CaptureValidation } from "../validation/capture-validation";
import { Validation } from "../validation/validation";

export class CaptureService {
    static async create(req: CaptureRequest, user: User): Promise<CaptureResponse>{
        const captureRequest = Validation.validate(CaptureValidation.CREATE, req)

        const uploadedImage = await uploadFile("capture", captureRequest.image)

        const data = await detection(`${process.env.BUCKER_URL}${uploadedImage}`)

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