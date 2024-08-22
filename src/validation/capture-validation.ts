import { z, ZodType } from "zod";


export class CaptureValidation {
    static readonly CREATE: ZodType = z.object({
        image: z.instanceof(File, {
            message: "Invalid file type",
        }).refine((file) => {
            return file.size <= 5 * 1024 * 1024;
        }, {
            message: "File size should be less than 5MB",
        }).refine((file) => {
            return ["image/png", "image/jpeg"].includes(file.type);
        }, {
            message: "Only PNG and JPEG files are allowed",
        }),
    })
}