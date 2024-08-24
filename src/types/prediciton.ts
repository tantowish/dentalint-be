type ImageData = {
    width: number;
    height: number;
}

type Prediction = {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
    class: string;
    class_id: number;
    detection_id: string;
}

export type PredicitonResult = {
    inference_id: string;
    time: number;
    image: ImageData;
    predictions: Prediction[];
}
