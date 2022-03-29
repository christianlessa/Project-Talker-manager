const validationRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate === undefined) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  const rateNumber = Number(rate);

  if (!(rateNumber >= 1 && rateNumber <= 5)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = validationRate;
