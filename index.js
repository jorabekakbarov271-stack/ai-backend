import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

/* ===============================
   🔐 OPENROUTER API KEY
   (hozircha kod ichida)
================================ */
const OPENROUTER_API_KEY = "BU_YERGA_O'ZINGNI_API_KEYINGNI_QO'Y";

/* ===============================
   🧠 AGENT PROMPT
================================ */
const SYSTEM_PROMPT = `
Sen aqlli AI yordamchisan.
Foydalanuvchiga:
- aniq
- tushunarli
- qisqa
- foydali

javob ber.

Agar savol:
- dasturlash bo‘lsa → kod bilan tushuntir
- xato bo‘lsa → sabab + yechim
- umumiy savol bo‘lsa → sodda tushuntir
`;

/* ===============================
   🤖 CHAT ENDPOINT
================================ */
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Xabar bo‘sh bo‘lmasligi kerak",
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://ai-backend-bv5a.onrender.com",
          "X-Title": "Flutter AI Assistant",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ??
      "AI javob bera olmadi";

    res.json({ reply });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({
      reply: "AI serverda xatolik yuz berdi",
    });
  }
});

/* ===============================
   🚀 SERVER START
================================ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 OpenRouter AI Agent running on port ${PORT}`);
});
