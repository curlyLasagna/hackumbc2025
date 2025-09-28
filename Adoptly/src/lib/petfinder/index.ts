import { Client } from "@petfinder/petfinder-js";
import { ai, GEMINI_DEFAULT_MODEL } from "../gemini";
import { getPetFunctionDeclaration } from "./get-pet";

export const pf = new Client({
  apiKey: import.meta.env.VITE_PF_API_KEY,
  secret: import.meta.env.VITE_PF_SECRET
});

export async function getPetGemini(prompt: string) {
  const res = await ai.models.generateContent({
    model: GEMINI_DEFAULT_MODEL,
    contents: {
      role: 'user',
      parts: [{ text: prompt }]
    },
    config: {
      tools: [
        {
          functionDeclarations: [
            getPetFunctionDeclaration,
          ],
        },
      ],
    }
  })
  return { fn: res.functionCalls && res.functionCalls.length > 0 ? res.functionCalls[0] : undefined };
}
