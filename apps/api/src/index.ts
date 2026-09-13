import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });
dotenv.config({ path: path.resolve(process.cwd(), "../../.env.local") });

const app = express();
const server = createServer(app);

const REALTIME_MODEL = "gpt-realtime";
const TRANSCRIPTION_MODEL = "gpt-realtime-whisper";

const wss = new WebSocketServer({
  server,
  path: "/transcription",
});

app.get("/", (_, res) => {
  res.json({
    status: "ok",
  });
});

wss.on("connection", (clientSocket) => {
  console.log("React Native client connected");

  const openaiSocket = new WebSocket(
    `wss://api.openai.com/v1/realtime?model=${REALTIME_MODEL}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  openaiSocket.on("open", () => {
    console.log("Connected to OpenAI Realtime API");

    openaiSocket.send(
      JSON.stringify({
        type: "session.update",
        session: {
          type: "realtime",
          audio: {
            input: {
              format: {
                type: "audio/pcm",
                rate: 24000,
              },
              transcription: {
                model: TRANSCRIPTION_MODEL,
              },
              turn_detection: {
                type: "server_vad",
              },
            },
          },
        },
      })
    );
  });

  clientSocket.on("message", (message, isBinary) => {
    if (openaiSocket.readyState !== WebSocket.OPEN) {
      return;
    }

    /*
     * React Native sends raw PCM16 audio bytes.
     *
     * OpenAI expects input_audio_buffer.append
     * containing Base64 encoded audio.
     */

    const audioBase64 = Buffer.from(message as Buffer).toString("base64");

    openaiSocket.send(
      JSON.stringify({
        type: "input_audio_buffer.append",
        audio: audioBase64,
      })
    );
  });

  openaiSocket.on("message", (data: any) => {
    const event = JSON.parse(data.toString());

    console.log("OpenAI:", event.type);

    /*
     * Partial transcription
     */
    if (
      event.type ===
      "conversation.item.input_audio_transcription.delta"
    ) {
      clientSocket.send(
        JSON.stringify({
          type: "transcript.delta",
          text: event.delta,
        })
      );
    }

    /*
     * Completed transcription segment
     */
    if (
      event.type ===
      "conversation.item.input_audio_transcription.completed"
    ) {
      clientSocket.send(
        JSON.stringify({
          type: "transcript.completed",
          text: event.transcript,
        })
      );
    }

    if (event.type === "error") {
      console.error("OpenAI error:", event);

      clientSocket.send(
        JSON.stringify({
          type: "error",
          error: event.error,
        })
      );
    }
  });

  clientSocket.on("close", () => {
    console.log("React Native disconnected");

    if (openaiSocket.readyState === WebSocket.OPEN) {
      openaiSocket.close();
    }
  });

  openaiSocket.on("close", () => {
    console.log("OpenAI connection closed");
  });

  openaiSocket.on("error", (error) => {
    console.error("OpenAI WebSocket error:", error);
  });
});

const PORT = Number(process.env.PORT ?? 3000);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
