module.exports = (sequelize, DataTypes) => {
  const Bouquet = sequelize.define("bouquet", {
    nom: DataTypes.STRING,
    descr: DataTypes.STRING,
    image: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Bouquet;
};
