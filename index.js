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

app.listen(3000, () => {
  console.log("🚀 Backend running on http://localhost:3000");
});
