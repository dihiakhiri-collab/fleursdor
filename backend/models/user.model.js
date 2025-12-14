module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    }
  });

  return User;
};
