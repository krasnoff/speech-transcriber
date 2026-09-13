import express, { NextFunction, request, Request, Response, Router } from "express";
import { z } from "zod";
import { systemPrompt } from "@repo/common/lib/system_prompt";

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

const router: Router = express.Router();

router.post("/transcribe", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const [{ createOpenAI }, { generateObject }] = await Promise.all([
            import("@ai-sdk/openai"),
            import("ai"),
        ]);

        const body = request.body as TranscribeRequestBody;
        const transcript = body?.transcript?.trim();

        if (!transcript) {
            return response.status(400).json({
              error: "Missing required field: transcript",
            });
        }

        const ollama = createOpenAI({
            baseURL: process.env.OLLAMA_BASE_URL,
            apiKey: process.env.OLLAMA_API_KEY ?? "",
        });

        const result = await generateObject({
            model: ollama(process.env.OLLAMA_MODEL ?? "gpt-oss:120b-cloud"),
            system: systemPrompt,
            prompt: transcript,
            schema: transcriptionSummarySchema,
        });

        response.status(200).json(result.object);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;