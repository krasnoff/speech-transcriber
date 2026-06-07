import { createOpenAI } from "@ai-sdk/openai";
import { systemPrompt } from "@repo/common/lib/system_prompt";
import { generateObject } from "ai";
import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { z } from "zod";

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });
dotenv.config({ path: path.resolve(process.cwd(), "../../.env.local") });

const app = express();
const port = Number(process.env.PORT) || 4000;

type TranscribeRequestBody = {
  transcript?: string;
};

const transcriptionSummarySchema = z.object({
  overallSummary: z.string(),
  mainInsights: z.string(),
  toDoList: z.array(
    z.object({
      teamMemberName: z.string(),
      todo: z.array(
        z.object({
          item: z.string(),
        })
      ),
    })
  ),
});

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({
    name: "speech-transcriber-api",
    message: "API is running",
  });
});

app.post("/api/transcribe", async (req, res) => {
    try {
    if (!process.env.OLLAMA_API_KEY) {
      return res.status(500).json({
        error: "Missing server env: OLLAMA_API_KEY",
      });
    }

        const transcript = req.body?.transcript?.trim();

        if (!transcript) {
            return res.status(400).json({ error: "Missing required field: transcript" });
        }

        const ollama = createOpenAI({
            baseURL: process.env.OLLAMA_BASE_URL,
          apiKey: process.env.OLLAMA_API_KEY,
        });

        const result = await generateObject({
            model: ollama(process.env.OLLAMA_MODEL ?? "gpt-oss:120b-cloud"),
            system: systemPrompt,
            prompt: transcript,
            schema: transcriptionSummarySchema,
        });

        return res.json(result.object);
    } catch (error) {
        console.error("Transcribe request failed:", error);
        return res.status(500).json({ error: "Chat request failed." });
    }
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
