import { Type, type FunctionDeclaration } from "@google/genai";
import { pf } from "..";

export const getPetFunctionDeclaration = {
  name: "getPet",
  description: "Get a pet based on a user's description.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      type: {
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
      gender: {
        type: Type.STRING,
        description: "Gender of an animal. Boy or girl"
      },
      color: {
        type: Type.STRING,
        description: "Color of an animal"
      },
      house_trained: {
        type: Type.BOOLEAN,
        description: "Is house trained or not"
      },
      good_with_children: {
        type: Type.BOOLEAN,
        description: "Is good with children"
      }
    },
  },
} satisfies FunctionDeclaration;

type GetPetFunctionDeclaration =
  typeof getPetFunctionDeclaration.parameters.properties;

export async function getPet(args: GetPetFunctionDeclaration) {
  // await pf.authenticate();
  let response;
  try {
    response = await pf.animal.search({
      type: args?.type,
      breed: args?.breed,
      size: args?.size,
      gender: args?.gender,
      color: args?.color,
      house_trained: args?.house_trained,
      good_with_children: args?.good_with_children,
      location: "Baltimore, Maryland",
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong.", { cause: err });
  }

  return response.data.animals;
}
