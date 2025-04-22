const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { processarNota } = require("./ocrHandler");

const ULTRA_INSTANCE = process.env.ULTRAMSG_INSTANCE_ID;
const ULTRA_TOKEN = process.env.ULTRAMSG_TOKEN;

module.exports = async (req, res) => {
  const { event_type } = req.body;

  if (event_type === "message_received") {
    try {
      // Busca as últimas mensagens
      const messagesUrl = `https://api.ultramsg.com/${ULTRA_INSTANCE}/messages?token=${ULTRA_TOKEN}`;
      const response = await axios.get(messagesUrl);

      const mensagens = response.data;
      const ultimaImagem = mensagens.find(msg => msg.type === "image" && msg.media);

      if (!ultimaImagem) {
        console.log("⚠️ Nenhuma imagem com mídia encontrada.");
        return res.sendStatus(200);
      }

      const mediaId = ultimaImagem.media;
      const mediaUrl = `https://api.ultramsg.com/${ULTRA_INSTANCE}/messages/media/${mediaId}?token=${ULTRA_TOKEN}`;

      const mediaResponse = await axios.get(mediaUrl);
      const imageUrl = mediaResponse.data.url;

      const filename = `nota_${Date.now()}.jpg`;
      const filepath = path.join(__dirname, filename);

      const imageStream = await axios.get(imageUrl, { responseType: "stream" });
      const writer = fs.createWriteStream(filepath);
      imageStream.data.pipe(writer);

      writer.on("finish", async () => {
        console.log("📥 Imagem recebida e salva:", filename);
        await processarNota(filepath);
        fs.unlinkSync(filepath);
      });

      writer.on("error", (err) => console.error("❌ Erro ao salvar imagem:", err));
    } catch (err) {
      console.error("❌ Erro geral no webhook:", err.response?.data || err.message);
    }
  }

  res.sendStatus(200);
};
