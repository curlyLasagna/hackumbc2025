import { getPetGemini } from "@/lib/petfinder";
import jsonparser from "body-parser";
import cors from "cors";
import express, { type Express } from "express";

export const createServer = (): Express => {
  const app = express();

  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  app.disable("x-powered-by");
  app.use(jsonparser.urlencoded({ extended: true }));
  app.use(jsonparser.json());

  app.get("/status", (_, res) => {
    res.status(200).json({ ok: true });
  });
  app.get("/q", async (req, res) => {
    const q = typeof req.query.q === "string" ? req.query.q : "";

    if (q.length < 1 || !q.length) {
      res
        .status(400)
        .json({ ai: null, error: "Please provide a query.", pets: [] });
    }

    const { text, pets } = await getPetGemini(q);

    res
      .status(200)
      .json({ ai: { response: text, query: q }, pets, error: null });
  });

  return app;
};
