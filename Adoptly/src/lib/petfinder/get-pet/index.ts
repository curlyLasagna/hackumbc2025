import { Type, type FunctionDeclaration } from "@google/genai";
import { pf } from "..";

export const getPetFunctionDeclaration = {
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

export async function getPet(args: GetPetFunctionDeclaration) {
  await pf.authenticate();
  let response;
  try {
    response = await pf.animal.search({
      type: args?.animal_types,
      breed: args?.breed,
      size: args?.size,
      limit: args?.limit,
      location: "Baltimore, Maryland",
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong.", { cause: err });
  }

  return response.data.animals;
}
