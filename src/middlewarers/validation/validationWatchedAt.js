const validationWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  
  if (!watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
    
  // if de validação de data feito com ajuda de Fernando Mós e Eduardo Miyazaki.
  const arrayDate = watchedAt.split('/');
  if (arrayDate[0].length !== 2 || arrayDate[1].length !== 2 || arrayDate[2].length !== 4) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = validationWatchedAt;
