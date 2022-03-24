const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const talkers = 'talker.json';
const validEmail = require('./src/middlewarers/validation/validationEmail');
const validPassword = require('./src/middlewarers/validation/validationPassword');
const validToken = require('./src/middlewarers/validation/validationToken');
const validName = require('./src/middlewarers/validation/validationName');
const validAge = require('./src/middlewarers/validation/validationAge');
const validTalk = require('./src/middlewarers/validation/validationTalk');
const validWatchedAt = require('./src/middlewarers/validation/validationWatchedAt');
const validRate = require('./src/middlewarers/validation/validationRate');
const token = require('./src/middlewarers/createToken');

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

app.post('/login', validEmail, validPassword, token);

app.post('/talker', validToken, validTalk, validWatchedAt, validName,
 validAge, validRate, async (req, res) => {
  const { name, age, talk, watchedAt, rate } = req.body;

  const fileTalkers3 = await fs.readFile(talkers).then((data) => JSON.parse(data));

  const obj = { name, age, id: fileTalkers3.length + 1, talk, watchedAt, rate };

  fileTalkers3.push(obj);

  await fs.writeFile(talkers, JSON.stringify(fileTalkers3));

  return res.status(201).json(obj);
});

app.listen(PORT, () => {
  console.log('Online');
});
