exports.acheter = (req, res) => {

  // Utilisateur récupéré grâce au JWT
  if (!req.user) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  const bouquets = req.body.bouquets;

  res.json({
    message: "Achat validé",
    user: req.user,
    bouquets
  });
};
