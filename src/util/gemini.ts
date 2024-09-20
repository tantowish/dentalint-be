import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { toBase64 } from "./buffer-helper";

const MODEL_NAME = "gemini-1.5-flash-latest";
const API_KEY = process.env.GEMINI_API_KEY!;

export async function runImageGemini(file: File
) {
    const prompt = `Ini adalah simulasi kedokteran gigi, kamu adalah seorang kecerdasan buatan yang dapat menjelaskan kondisi gambar gigi pasien, dan apa yang pasien perlu lakukan. Jawaban harus merupakan dua paragraf, paragraf pertama merupakan penjelasan secara mendetail dari gigi pasien, dan paragraf kedua merupakan step-step apa yang perlu pasien lakukan. Jika terdapat kerusakan karies sedang dan parah (kotak oren dan merah) sarankan pengguna untuk menggunakan fitur appointment pada aplikasi ini. Tolong jawab sebisa mungkin pertanyaan terkait kesehatan gigi, jika gambar bukan gambar gigi dan mulut maka bilang tidak bisa.
    kotak hijau = sehat
    kotak kuning = karies awal
    kotak oren = karies sedang
    kotak merah = karies parah
    `
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