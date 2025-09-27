import { ai, GEMINI_DEFAULT_MODEL } from "@/lib/gemini";
import { Type, type FunctionDeclaration } from "@google/genai/web";
import { getAnimalTypes, getAnimalTypesDeclaration } from "../animal-types";
import { pf } from "..";

const getPetFunctionDeclaration = {
  name: "getPet",
  description: "Get a pet based on a user's description.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      animal_types: {
        type: Type.STRING,
        description: "The kind of animal this user wants.",
      },
      breed: {
        type: Type.STRING,
        description: "Breed of animal. Comma separated if multiple values.",
      },
      size: {
        type: Type.STRING,
        description:
          "Size of animal. xsmall,small,medium,large. Comma separated if multiple values",
      },
      limit: {
        type: Type.INTEGER,
        description: "How many animals to get.",
      },
    },
  },
} satisfies FunctionDeclaration;

type GetPetFunctionDeclaration =
  typeof getPetFunctionDeclaration.parameters.properties;

async function getPet(args: GetPetFunctionDeclaration) {
  await pf.authenticate();
  const response = await pf.animal.search({
    type: args?.animal_types,
    breed: args?.breed,
    size: args?.size,
    limit: args?.limit,
  });

  // Extract only the serializable data from the response
  return response.data.animals;
}

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

  
  if (response.functionCalls && response.functionCalls.length > 0) {
    for (const call of response.functionCalls) {
      const fnName = call.name as string;
      if (!functions[fnName]) throw new Error(`Function not found`);
      const fnResponse = await functions[fnName](call.args);
      
      response = await chat.sendMessage({
        message: {
          functionResponse: {
            name: fnName,
            response: { result: { ...fnResponse } },
          },
        },
      });
    }
  }
  console.log(response.candidates[0].content?.parts[0].functionCall);
  
  const parts = response.candidates?.[0].content?.parts;
  let full = "";
  if (parts) {
    for (const part of parts) {
      if (part.text) {
        full += part.text;
      }
    }
  }
  console.log(full);

  return full;
}

getPetGemini(
  "gimme some animals that is cat, ideally tabby cats. show me like 20"
);
