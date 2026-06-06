import { NextRequest, NextResponse } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { systemPrompt } from "@/lib/system_prompt";

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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TranscribeRequestBody;
    const transcript = body?.transcript?.trim();

    if (!transcript) {
      return NextResponse.json(
        { error: "Missing required field: transcript" },
        { status: 400 }
      );
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

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Transcribe request failed:", error);
    return NextResponse.json({ error: "Chat request failed." }, { status: 500 });
  }
}
