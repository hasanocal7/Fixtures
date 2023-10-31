module.exports = (sequelize, DataTypes) => {
  const Furniture = sequelize.define('Furniture', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Furniture;
};
