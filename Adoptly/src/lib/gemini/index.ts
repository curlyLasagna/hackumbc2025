import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables before any other imports
dotenv.config();
export const GEMINI_DEFAULT_MODEL = "gemini-2.5-flash";
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
