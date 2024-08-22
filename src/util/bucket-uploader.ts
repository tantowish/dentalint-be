import { Storage } from "@google-cloud/storage";
import { ResponseErorr } from "../error/reponse-error";
import { randomUUID } from "crypto";

export async function uploadFile(dir: string, file: File){
    try {
        const projectId = process.env.PROJECT_ID
        const bucketName = process.env.BUCKET_NAME!
        const keyFileName = process.env.KEYFILENAME

        const re = /(?:\.([^.]+))?$/;
        const fileExt = re.exec(file.name)?.[0];
        const fileLocation = `${dir}/${randomUUID()}${fileExt}`;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const storage = new Storage({
            projectId: projectId,
            keyFilename: keyFileName,
        })

        const bucket = storage.bucket(bucketName)
        const blob = bucket.file(fileLocation);

        await new Promise((resolve, reject) => {
            const blobStream = blob.createWriteStream({
                resumable: false,
            });
        
            blobStream.on("error", (err) => {
                reject(err);
            });
        
            blobStream.on("finish", async () => {
                try {
                    await bucket.file(fileLocation).makePublic();
                    resolve(null);
                } catch (error) {
                    reject(error);
                }
            });
        
            blobStream.end(buffer);
        });

        return fileLocation
    } catch (error) {
        throw new ResponseErorr(500, "Failed to upload file: "+error)
    }
}