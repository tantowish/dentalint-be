import { title } from "process";
import { string, z, ZodType } from "zod";

export class NoteValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(1).optional(),
        times: z.array(z.string()),
        fnb: z.string().min(1),
        note: z.string().min(1).optional()
    })
}   