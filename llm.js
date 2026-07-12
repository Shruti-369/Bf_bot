import OpenAI from "openai";
import dotenv from "dotenv";
import { buildPrompt } from "./promptBuilder.js";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function callLLM(userMessage, memory) {

    const messages = buildPrompt(memory, userMessage);

    const response = await client.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages,

        temperature: 0.8,

        max_tokens: 500,

    });

    return response.choices[0].message.content;

}