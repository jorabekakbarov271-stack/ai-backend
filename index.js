import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* ===============================
   🔑 OPENROUTER API KEY
   (envsiz, test uchun)
================================ */
const OPENROUTER_API_KEY = "sk-or-v1-PASTE_YOUR_REAL_KEY_HERE";

/* ===============================
   🤖 AGENT SYSTEM PROMPT
   (SKILL ga mos)
================================ */
const SYSTEM_PROMPT = `
You are an AI assistant agent.
You must:
- Answer clearly
- Be helpful
- Explain step by step if needed
- Speak Uzbek if user speaks Uzbek
- Help with programming, Flutter, backend, and compilers
`;

/* ===============================
   💬 CHAT ENDPOINT
================================ */
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://flutter-ai-app.local",
          "X-Title": "Flutter AI Agent",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      console.error(data);
      return res.status(500).json({ error: "AI response error" });
    }

    res.json({
      reply: data.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ===============================
   🚀 START SERVER
================================ */
app.listen(PORT, () => {
  console.log(`🚀 OpenRouter AI Agent running on port ${PORT}`);
});
