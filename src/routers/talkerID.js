const express = require('express');

const fs = require('fs').promises;

const router = express.Router();
const talkers = 'talker.json';

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const fileTalkers2 = await fs.readFile(talkers, 'utf8').then((data) => JSON.parse(data));

  const talkerID = fileTalkers2.find((talk) => talk.id === id);
  if (!talkerID) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talkerID);
});
