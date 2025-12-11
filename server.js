import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_KEY = process.env.API_FOOTBALL_KEY;

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

// Mensagem padrão para testarmos
app.post("/webhook", async (req, res) => {
  const message = req.body.message;

  if (message && message.text) {
    const chatId = message.chat.id;
    const userText = message.text;

    console.log("Mensagem recebida:", userText);

    // Enviar resposta para o usuário
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: `Recebi sua mensagem: ${userText}`
    });
  }

  res.sendStatus(200);
});

// Teste da API-Football
app.get("/test-football", async (req, res) => {
  try {
    const response = await axios.get(
      "https://v3.football.api-sports.io/status",
      {
        headers: { "x-apisports-key": API_KEY }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao chamar a API-Football");
  }
});

// Teste simples de servidor
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));
