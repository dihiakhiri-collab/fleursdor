const orm = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new orm({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
  logging: false,
});

const db = {};
db.orm = orm;
db.sequelize = sequelize;

// Import models
db.Bouquet = require("./bouquet.model")(sequelize, orm);
db.Flower = require("./flower.model")(sequelize, orm);
db.User = require("./user.model")(sequelize, orm);
db.BouquetFlower = require("./bouquetFlower.model")(sequelize, orm);
db.Like = require("./likebouquet.model")(sequelize, orm);
db.Transaction = require("./transaction.model")(sequelize, orm);

// Associations
require("./associations")(db);

module.exports = db;
