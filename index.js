import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const { message } = req.body;

  res.json({
    reply: `🤖 Demo AI javobi: ${message}`,
  });
});

// 🔴 MUHIM JOY
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
