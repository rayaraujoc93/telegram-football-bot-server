import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const API_KEY = process.env.API_FOOTBALL_KEY;

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.post("/webhook", async (req, res) => {
  console.log("Mensagem recebida do Telegram:", req.body);
  res.sendStatus(200);
});

app.get("/test-football", async (req, res) => {
  try {
    const response = await axios.get(
      "https://v3.football.api-sports.io/status",
      {
        headers: {
          "x-apisports-key": API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao chamar a API-Football");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
