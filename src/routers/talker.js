const express = require('express');

const fs = require('fs').promises;

const router = express.Router();
const talkers = 'talker.json';

router.get('/talker', async (req, res) => {
  try {
    const fileTalkers = await fs.readFile(talkers, 'utf8');
    res.status(200).send(JSON.parse(fileTalkers));
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
});

module.exports = router;