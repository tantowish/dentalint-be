import { ResponseErorr } from "../error/reponse-error";
import { toBase64 } from "./buffer-helper";

export async function detection(image: File) {
    try {
        const base64Image = await toBase64(image)
        const response = await fetch(`https://detect.roboflow.com/dentalint/2?api_key=nPMByXM6NKA7fgV05oaZ`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: base64Image
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ResponseErorr(500, await data.message)
        }

        console.log(data)
        return data;
    } catch (error) {
        throw new ResponseErorr(500, "Failed to detect image: " + error)
    }
}