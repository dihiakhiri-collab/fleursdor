const db = require("../models");
const Flower = db.Flower;

//changement avec question 2-b) EXO3 
exports.findAll = async (req, res) => {
  const flowers = await Flower.findAll();
 // utilisateur non authentifié
  if (!req.user) {
    return res.json(
      flowers.map(f => ({
        id: f.id,
        nom: f.nom,
        image: f.image
        // ❌ pas de prix
      }))
    );
  }

  res.json(flowers);
};


exports.findOne = async (req, res) => {
  const f = await Flower.findByPk(req.params.id);

  if (!req.user) {
    return res.json({
      id: f.id,
      nom: f.nom,
      image: f.image
    });
  }

  res.json(f);
};


exports.create = async (req, res) => {
  const flower = await Flower.create(req.body);
  res.json(flower);
};
