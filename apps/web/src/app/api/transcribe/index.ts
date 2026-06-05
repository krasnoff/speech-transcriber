import { NextApiRequest, NextApiResponse } from "next";
import 'dotenv/config';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { systemPrompt } from "@/lib/system_prompt";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        if (req.method === 'POST') {
            // Configure Ollama using OpenAI-compatible API
            const ollama = createOpenAI({
                baseURL: process.env.OLLAMA_BASE_URL,
                apiKey: process.env.OLLAMA_API_KEY, // Empty string for local Ollama instances
            });

            try {
                const result = await generateText({
                    model: ollama(process.env.OLLAMA_MODEL ?? 'gpt-oss:120b-cloud'), // Use your available model
                    system: systemPrompt, // SYSTEM PROMPT AS ABOVE - OMITTED FOR BREVITY
                    prompt: req.body.transcript, // The transcript text from the request body
                });

                return res.json({ 
                    response: result.text,
                    usage: result.usage 
                });
            } catch (error) {
                console.error('Error:', error);
                return res.status(500).json({ error: 'Chat request failed.' });
            }
        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (err) {
        console.log(err, process.env); 
        res.status(500).json({ error: 'failed to load data' });
    }
}