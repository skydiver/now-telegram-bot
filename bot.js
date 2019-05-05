const express = require('express');
const bodyParser = require('body-parser');
const rp = require('request-promise');

const app = express();
module.exports = app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BOT_URL = process.env.TELEGRAM_BOT_URL;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TOKEN}`;

app.post(`/bot${TOKEN}`, async (req, res) => {
  const response = await rp({
    method: 'POST',
    uri: `${TELEGRAM_API_URL}/sendMessage`,
    body: {
      chat_id: req.body.message.chat.id,
      text: 'Hello World!',
    },
    json: true,
  });
  res.json({
    status: 'ok',
    response,
  });
});

app.get(`/register${TOKEN}`, async (req, res) => {
  const response = await rp({
    method: 'POST',
    uri: `${TELEGRAM_API_URL}/setWebhook`,
    body: {
      url: `${BOT_URL}/bot${TOKEN}`,
    },
    json: true,
  });
  res.json({
    status: 'ok',
    response,
  });
});

app.all('*', (req, res) => {
  res.status(405).send({ error: 'only POST requests are accepted' });
});
