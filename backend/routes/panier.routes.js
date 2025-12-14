const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const db = require("../models");

// ➕ Ajouter au panier
router.post("/:id", auth, async (req, res) => {
  await db.Transaction.create({
    userId: req.user.id,
    status: "cart",
  }).then(async (transaction) => {
    await transaction.addBouquet(req.params.id);
  });

  res.json({ ok: true });
});

// 🛒 Voir mon panier
router.get("/", auth, async (req, res) => {
  const cart = await db.Transaction.findAll({
    where: {
      userId: req.user.id,
      status: "cart",
    },
    include: db.Bouquet,
  });

  res.json(cart);
});

module.exports = router;
