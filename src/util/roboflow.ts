import { ResponseErorr } from "../error/reponse-error";

export async function detection(imageUrl: string) {
    try {
        console.log(imageUrl)
        const response = await fetch(`https://detect.roboflow.com/dentalint/2?api_key=nPMByXM6NKA7fgV05oaZ&image=${imageUrl}`, {
            method: "POST"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ResponseErorr(500, await data.message)
        }

        console.log(data)
        return data;
    } catch (error) {
        throw new ResponseErorr(500, "Failed to detect image: ")
    }
}