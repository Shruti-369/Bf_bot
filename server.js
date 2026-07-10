import express from "express";
import cors from "cors";

import { callLLM } from "./llm.js";
import { loadMemory, saveMemory } from "./memory.js";

const app = express();

app.use(cors());
app.use(express.json());

const memory = loadMemory();

app.post("/chat", async (req, res) => {
    try {

        const { message } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({
                error: "message is required",
            });
        }

        // Build history for LLM
        const history = [
            ...memory.firstMessages,
            ...memory.recentMessages,
        ];

        // Get AI reply
        const reply = await callLLM(message, history);

        // User Message
        const userMessage = {
            role: "user",
            content: message,
        };

        // Assistant Message
        const assistantMessage = {
            role: "assistant",
            content: reply,
        };

        // Save User
        if (memory.firstMessages.length < 20) {
            memory.firstMessages.push(userMessage);
        } else {
            memory.recentMessages.push(userMessage);
        }

        // Save Assistant
        if (memory.firstMessages.length < 20) {
            memory.firstMessages.push(assistantMessage);
        } else {
            memory.recentMessages.push(assistantMessage);
        }

        // Keep only last 20 recent messages
        while (memory.recentMessages.length > 20) {
            memory.recentMessages.shift();
        }

        // Save into memory.json
        saveMemory(memory);

        res.json({
            reply,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Something went wrong",
        });

    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Bf_bot server running on http://localhost:${PORT}`);
});