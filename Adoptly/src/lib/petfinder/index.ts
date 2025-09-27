import petfinder from "@petfinder/petfinder-js";

export const pf = new petfinder.Client({
  apiKey: import.meta.env.VITE_PF_API_KEY,
  secret: import.meta.env.VITE_PF_SECRET,
});
