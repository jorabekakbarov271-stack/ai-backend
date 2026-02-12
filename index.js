import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function getReply(message) {
  const text = message.toLowerCase();

  if (text.includes("salom")) {
    return "Salom! Sizga Dart va Flutter bo‘yicha yordam bera olaman 🙂";
  }

  if (text.includes("dart")) {
    return "Dart — Google tomonidan yaratilgan dasturlash tili. Flutter ilovalarini yozishda ishlatiladi.";
  }

  if (text.includes("flutter")) {
    return "Flutter — Android va iOS uchun bitta kod bilan ilova yaratish frameworki.";
  }

  if (text.includes("class")) {
    return "Class — obyekt yaratish uchun shablon. Dart’da class ichida o‘zgaruvchi va funksiyalar bo‘ladi.";
  }

  if (text.includes("funksiya")) {
    return "Funksiya — qayta-qayta ishlatiladigan kod bo‘lagi. Dart’da funksiya return qiymat qaytarishi mumkin.";
  }

  if (text.includes("for")) {
    return "for loop takrorlash uchun ishlatiladi:\n\nfor (int i = 0; i < 5; i++) {\n  print(i);\n}";
  }

  if (text.includes("if")) {
    return "if shart operatori:\n\nif (x > 0) {\n  print('Musbat');\n} else {\n  print('Manfiy');\n}";
  }

  return "Savolni aniqroq yozing. Men Dart va Flutter mavzularida yordam bera olaman 🙂";
}

app.post("/chat", (req, res) => {
  const { message } = req.body;

  const reply = getReply(message);

  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Rule-based assistant running on port", PORT);
});
