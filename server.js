import express from "express";
import cors from "cors";
import { callLLM } from "./llm.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "message is required" });
        }

        // history should be an array of { role: "user"|"assistant", content: string }
        const safeHistory = Array.isArray(history) ? history.slice(-20) : [];

        const reply = await callLLM(message, safeHistory);
        res.json({ reply });
    } catch (err) {
        console.error("Chat error:", err.message);
        res.status(500).json({ error: "Something went wrong. Try again." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bf_bot server running on http://localhost:${PORT}`);
});