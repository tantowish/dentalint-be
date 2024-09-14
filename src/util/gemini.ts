import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { toBase64 } from "./buffer-helper";

const MODEL_NAME = "gemini-1.5-flash-latest";
const API_KEY = process.env.GEMINI_API_KEY!;

export async function runImageGemini(file: File
) {
    const prompt = `Ini adalah simulasi kedokteran gigi, kamu adalah kecerdasan buatan yang dapat menjelaskan gambar gigi pasien, dan apa yang pasien perlu lakukan. Tolong jawab sebisa mungkin pertanyaan terkait kesehatan gigi dan mulu, jika gambar bukan gambar gigi dan mulut maka bilang tidak bisa
    kuning = caries
    ungu = sisa akar`
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
            role: "user",
            parts: [
                {
                    inlineData: {
                        data: await toBase64(file),
                        mimeType: file.type
                    }
                },
                {
                    text: prompt
                }
            ],
        },
      ]
    });
  
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    
    return response.text()
  }