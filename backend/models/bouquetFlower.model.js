module.exports = (sequelize, DataTypes) => {
  return sequelize.define("bouquetFlower", {
    quantity: DataTypes.INTEGER
  });
};
