require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const handleUltraMsgWebhook = require("./ultramsgWebhook");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));

app.post("/webhook", handleUltraMsgWebhook);

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Servidor rodando na porta ${process.env.PORT || 3000}`);
});
