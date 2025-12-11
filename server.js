import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_KEY = process.env.API_FOOTBALL_KEY;

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

// Webhook do Telegram
app.post("/webhook", async (req, res) => {
  const message = req.body.message;

  if (message && message.text) {
    const chatId = message.chat.id;
    const userText = message.text;

    console.log("Mensagem recebida:", userText);

    try {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `Recebi sua mensagem: ${userText}`
      });
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err.message);
    }
  }

  res.sendStatus(200);
});

// Teste API-Football
app.get("/test-football", async (req, res) => {
  try {
    const response = await axios.get(
      "https://v3.football.api-sports.io/status",
      { headers: { "x-apisports-key": API_KEY } }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao chamar a API-Football");
  }
});

// Teste simples
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

