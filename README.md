# 🤖 Agente de Gastos OCR via WhatsApp

Sistema inteligente que utiliza **OCR (Reconhecimento Óptico de Caracteres)** para ler automaticamente recibos enviados via WhatsApp e lançar os dados extraídos em uma planilha do **Google Sheets**. Ideal para controle de gastos pessoais ou empresariais, com integração pronta para automação.

---

## 🚀 Funcionalidades

- 📷 Recebe imagens de notas fiscais e recibos via WhatsApp
- 🧠 Extrai dados como valor, data, categoria e descrição usando OCR
- 📊 Lança automaticamente os dados em uma planilha do Google Sheets
- 🔁 Funcionamento 24/7 com integração via webhook
- 🌐 API não oficial de WhatsApp (UltraMsg)
- 🔐 Uso seguro com variáveis `.env` (sem credenciais públicas)
- ⚙️ Fácil deploy em Railway, Replit ou local

---

## 📁 Estrutura do projeto


---

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- Tesseract OCR (via tesseract.js)
- Google Sheets API
- UltraMsg API
- dotenv

---

## ⚙️ Como configurar

1. **Clone o projeto**
```bash
git clone https://github.com/thyagohmo420/ocrsheets.git
cd ocrsheets


