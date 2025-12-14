// transaction.model.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("transaction", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "cart", // cart | paid
    },
  });
};
