module.exports = (sequelize, DataTypes) => {
  const Flower = sequelize.define("flower", {
    nom: DataTypes.STRING,
    description: DataTypes.STRING,
    prixUnitaire: DataTypes.FLOAT,
  });

  return Flower;
};
