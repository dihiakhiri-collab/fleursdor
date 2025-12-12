module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
  });

  return User;
};
