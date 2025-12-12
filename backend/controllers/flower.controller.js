const db = require("../models");
const Flower = db.Flower;

exports.findAll = async (req, res) => {
  res.json(await Flower.findAll());
};

exports.findOne = async (req, res) => {
  const f = await Flower.findByPk(req.params.id);
  res.json(f);
};

exports.create = async (req, res) => {
  const flower = await Flower.create(req.body);
  res.json(flower);
};
