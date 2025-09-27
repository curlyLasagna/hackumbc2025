import { Client } from "@petfinder/petfinder-js";
import { ai, GEMINI_DEFAULT_MODEL } from "../gemini";
import { getAnimalTypes, getAnimalTypesDeclaration } from "./animal-types";
import { getPet, getPetFunctionDeclaration } from "./get-pet";

export const pf = new Client({
  apiKey: process.env.PF_API_KEY ?? "",
  secret: process.env.PF_SECRET ?? "",
});

const functions = {
  getPet,
  getAnimalTypes,
};

export async function getPetGemini(prompt: string) {
  const chat = ai.chats.create({
    model: GEMINI_DEFAULT_MODEL,
    config: {
      tools: [
        {
          functionDeclarations: [
            getPetFunctionDeclaration,
            getAnimalTypesDeclaration,
          ],
        },
      ],
    },
  });
  const wholePrompt = prompt;

  let response = await chat.sendMessage({
    message: wholePrompt,
  });

  const pets = [];
  if (response.functionCalls && response.functionCalls.length > 0) {
    for (const call of response.functionCalls) {
      const fnName = call.name as keyof typeof functions;
      if (!functions[fnName]) throw new Error(`Function not found`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fnResponse = await functions[fnName](call.args as unknown as any);
      pets.push(...fnResponse);

      response = await chat.sendMessage({
        message: {
          functionResponse: {
            name: fnName,
            response: { result: fnResponse },
          },
        },
      });
    }
  }

  const parts = response.candidates?.[0]?.content?.parts;
  let full = "";
  if (parts) {
    for (const part of parts) {
      if (part.text) {
        full += part.text;
      }
    }
  }

  return { text: full, pets: pets ?? [] };
}
