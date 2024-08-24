export async function toBase64(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    return Buffer.from(buffer).toString('base64'); 
}

export async function arrayBufferToBuffer(arrayBuffer: ArrayBuffer): Promise<Buffer> {
    return Buffer.from(arrayBuffer);
}