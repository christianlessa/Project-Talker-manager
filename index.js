const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const talkers = 'talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const fileTalkers = await fs.readFile(talkers, 'utf8');
    res.status(200).send(JSON.parse(fileTalkers));
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const fileTalkers2 = await fs.readFile(talkers, 'utf8').then((data) => JSON.parse(data));

  const talkerID = fileTalkers2.find((talk) => talk.id === Number(id));
  if (!talkerID) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talkerID);
});

app.listen(PORT, () => {
  console.log('Online');
});
