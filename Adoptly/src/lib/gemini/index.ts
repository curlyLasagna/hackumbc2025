import { GoogleGenAI } from "@google/genai";

export const GEMINI_DEFAULT_MODEL = "gemini-2.5-flash";
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
