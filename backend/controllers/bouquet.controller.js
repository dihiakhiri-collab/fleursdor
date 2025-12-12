const db = require("../models");
const Bouquet = db.Bouquet;
const Flower = db.Flower;

exports.findAll = async (req, res) => {
  const data = await Bouquet.findAll({ include: Flower });
  res.json(data);
};

exports.findOne = async (req, res) => {
  const b = await Bouquet.findByPk(req.params.id, { include: Flower });
  if (!b) return res.status(404).json({ message: "Bouquet introuvable" });
  res.json(b);
};

exports.create = async (req, res) => {
  try {
    console.log("BODY :", req.body);
    console.log("FILE :", req.file);

    const { nom, descr, prix } = req.body;

    if (!nom || !descr || !prix) {
      return res.status(400).json({ error: "Champs invalides" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image obligatoire" });
    }

    const image = req.file.filename;

    // Récupération des fleurs envoyées par React
    let flowers = [];
    if (req.body.flowers) {
      flowers = JSON.parse(req.body.flowers);
    }

    if (!Array.isArray(flowers) || flowers.length === 0) {
      return res.status(400).json({ error: "Ajoutez au moins une fleur." });
    }

    // Création du bouquet
    const bouquet = await Bouquet.create({
      nom,
      descr,
      prix,
      image,
      likesCount: 0
    });

    // Ajout des fleurs dans la table pivot
    for (const f of flowers) {
      const flowerDb = await Flower.findOne({ where: { nom: f.nom } });

      if (flowerDb) {
        await bouquet.addFlower(flowerDb.id, {
          through: { quantity: f.quantite }
        });
      }
    }

    return res.status(201).json({ ok: true, bouquet });

  } catch (error) {
    console.error("Erreur création bouquet :", error);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.update = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;

    await Bouquet.update(data, { where: { id: req.params.id } });
    res.json({ updated: true });
  } catch (e) {
    res.status(500).json({ error: "Erreur update" });
  }
};

exports.delete = async (req, res) => {
  await Bouquet.destroy({ where: { id: req.params.id } });
  res.json({ deleted: true });
};

exports.like = async (req, res) => {
  const b = await Bouquet.findByPk(req.params.id);
  if (!b) return res.status(404).json({ ok: false });

  b.likesCount += 1;
  await b.save();

  res.json({ likes: b.likesCount });
};

exports.likesCount = async (req, res) => {
  const b = await Bouquet.findByPk(req.params.id);
  res.json({ likes: b.likesCount });
};

exports.usersLiked = async (req, res) => {
  res.json(["user1", "user2"]);
};
