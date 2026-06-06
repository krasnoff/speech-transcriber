import { NextRequest, NextResponse } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { systemPrompt } from "@/lib/system_prompt";

type TranscribeRequestBody = {
  transcript?: string;
};

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

    const result = await generateText({
      model: ollama(process.env.OLLAMA_MODEL ?? "gpt-oss:120b-cloud"),
      system: systemPrompt,
      prompt: transcript,
    });

    return NextResponse.json({
      response: result.text,
      usage: result.usage,
    });
  } catch (error) {
    console.error("Transcribe request failed:", error);
    return NextResponse.json({ error: "Chat request failed." }, { status: 500 });
  }
}
