import { GoogleGenAI } from "@google/genai/web";

export const GEMINI_DEFAULT_MODEL = "gemini-2.5-flash";
export const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
