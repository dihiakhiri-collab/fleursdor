module.exports = (sequelize, DataTypes) => {
  return sequelize.define("transaction", {
    date: DataTypes.DATE
  });
};
