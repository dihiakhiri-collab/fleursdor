module.exports = (db) => {
  const { Bouquet, Flower, User, BouquetFlower, Like, Transaction } = db;

  // 1) Un bouquet contient plusieurs types de fleurs
  Bouquet.belongsToMany(Flower, { through: BouquetFlower });
  Flower.belongsToMany(Bouquet, { through: BouquetFlower });

  // 2) Un utilisateur peut liker plusieurs bouquets
  User.belongsToMany(Bouquet, { through: Like, as: "likes" });
  Bouquet.belongsToMany(User, { through: Like, as: "likedBy" });

  // 3) Un User peut acheter plusieurs bouquets (transaction)
  User.hasMany(Transaction);
  Transaction.belongsTo(User);

  // 4) Une transaction contient 1+ bouquets (N-N)
  Transaction.belongsToMany(Bouquet, { through: "transactionItems" });
  Bouquet.belongsToMany(Transaction, { through: "transactionItems" });
};
