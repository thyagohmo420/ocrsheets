require("dotenv").config();
const fs = require("fs");
const vision = require("@google-cloud/vision");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const credentials = require("./credentials.json");

const client = new vision.ImageAnnotatorClient({ credentials });
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

function extrairValor(texto) {
  const match = texto.match(/(R\$\s?\d+[\.,]?\d{2})/);
  return match ? match[1] : "N/A";
}

function extrairEstabelecimento(texto) {
  const linhas = texto.split("\n");
  return linhas[0] || "Desconhecido";
}

async function processarNota(imagePath) {
  try {
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;
    const textoCompleto = detections[0]?.description || "Texto não detectado";

    const valor = extrairValor(textoCompleto);
    const estabelecimento = extrairEstabelecimento(textoCompleto);
    const data = new Date().toLocaleDateString("pt-BR");

    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      Data: data,
      "Valor (R$)": valor,
      Estabelecimento: estabelecimento,
      Categoria: "",
      "Forma de Pagamento": "",
      Observação: textoCompleto
    });

    console.log("\n✅ Dados lançados na planilha com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao processar:", error);
  }
}

const caminhoImagem = "./nota.jpg";
processarNota(caminhoImagem);