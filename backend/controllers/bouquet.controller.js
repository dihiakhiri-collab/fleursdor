const db = require("../models");
const Bouquet = db.Bouquet;
const Flower = db.Flower;

//changement avec question 2-a) EXO3 
exports.findAll = async (req, res) => {
  const bouquets = await Bouquet.findAll({ include: Flower });

  // ❌ utilisateur NON authentifié
  if (!req.user) {
    return res.json(
      bouquets.map(b => ({
        id: b.id,
        nom: b.nom,
        descr: b.descr,
        image: b.image,
        prix: b.prix,   
        likesCount: b.likesCount, 
        Flowers: b.Flowers
       
      
      }))
    );
  }

  // ✅ utilisateur authentifié
  res.json(bouquets);
};


exports.findOne = async (req, res) => {
  const b = await Bouquet.findByPk(req.params.id, { include: Flower });
  if (!b) return res.status(404).json({ message: "Bouquet introuvable" });

  if (!req.user) {
    return res.json({
      id: b.id,
      nom: b.nom,
      descr: b.descr,
      image: b.image,
      prix: b.prix,   
      Flowers: b.Flowers
    });
  }

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
  if (!req.user) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  const bouquet = await Bouquet.findByPk(req.params.id);
  if (!bouquet) {
    return res.status(404).json({ error: "Bouquet introuvable" });
  }

  // Vérifier si l'utilisateur a déjà liké
  const alreadyLiked = await bouquet.hasLikedBy(req.user.id);

  if (alreadyLiked) {
    // UNLIKE
    await bouquet.removeLikedBy(req.user.id);
  } else {
    // LIKE
    await bouquet.addLikedBy(req.user.id);
  }

  // Recalculer le vrai compteur
  const likesCount = await bouquet.countLikedBy();

  res.json({
    liked: !alreadyLiked,
    likesCount
  });
};




exports.likesCount = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  const b = await Bouquet.findByPk(req.params.id);
  res.json({ likes: b.likesCount });
};


exports.usersLiked = async (req, res) => {
  const bouquet = await Bouquet.findByPk(req.params.id, {
    include: {
      model: db.User,
      as: "likedBy",
      attributes: ["id", "login", "fullName"],
      through: { attributes: [] }
    }
  });

  res.json(bouquet.likedBy);
};
