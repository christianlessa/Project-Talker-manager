const express = require('express');
const bodyParser = require('body-parser');
const padraoRouter = require('./src/routers/talker');
const padraoRouterID = require('./src/routers/talkerID');

const app = express();
app.use(bodyParser.json());

app.use(padraoRouter);

app.use(padraoRouterID);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
