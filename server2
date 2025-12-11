import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// 🔑 Variáveis de ambiente
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_KEY = process.env.API_FOOTBALL_KEY;

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// ===============================
// 📌 ROTA PARA RECEBER MENSAGENS DO TELEGRAM
// ===============================
app.post("/webhook", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || !message.text) {
      return res.sendStatus(200);
    }

    const chatId = message.chat.id;
    const userText = message.text;

    console.log("Mensagem recebida:", userText);

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: `Recebi sua mensagem: ${userText}`,
    });

    return res.sendStatus(200);

  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    return res.sendStatus(500);
  }
});

// ===============================
// 📌 TESTE API-FOOTBALL
// ===============================
app.get("/test-football", async (req, res) => {
  try {
    const response = await axios.get("https://v3.football.api-sports.io/status", {
      headers: { "x-apisports-key": API_KEY }
    });

    res.json(response.data);

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao chamar API-Football");
  }
});

// ===============================
// 📌 TESTE SERVIDOR
// ===============================
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// ===============================
// 📌 PORTA RENDER
// ===============================
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
