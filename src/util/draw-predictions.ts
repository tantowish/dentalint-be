import sharp from 'sharp';
import { PredicitonResult } from '../types/prediciton';

export async function drawPredictions(imageBuffer: Buffer, data: PredicitonResult): Promise<Buffer> {
    const inputImage = sharp(imageBuffer);

    const imageWidth = data.image.width;
    const imageHeight = data.image.height;

    const svgRects = data.predictions.map((prediction) => {
        const boxX = prediction.x - prediction.width / 2;
        const boxY = prediction.y - prediction.height / 2;
        const strokeColor = prediction.class === 'Caries' ? 'yellow' : 
                            prediction.class === 'Sisa Akar' ? 'red' : 'blue';
        return `
            <rect x="${boxX}" y="${boxY}" width="${prediction.width}" height="${prediction.height}"
                style="fill:none;stroke:${strokeColor};stroke-width:3" />
        `;
    }).join('\n');

    const svg = `
        <svg width="${imageWidth}" height="${imageHeight}">
            ${svgRects}
        </svg>
    `;

    const outputImage = await inputImage
        .composite([
            {
                input: Buffer.from(svg),
                blend: 'over'
            }
        ])
        .toBuffer();

    return outputImage;
}
