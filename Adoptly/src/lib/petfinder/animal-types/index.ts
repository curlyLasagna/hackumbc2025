import { type FunctionDeclaration } from "@google/genai";
import { pf } from "..";

export const getAnimalTypesDeclaration: FunctionDeclaration = {
  name: "getAnimalTypes",
  description: "Get a list of animal types.",
};

export async function getAnimalTypes() {
  await pf.authenticate();
  const response = await pf.http.get("/types");

  return response.data.types;
}

