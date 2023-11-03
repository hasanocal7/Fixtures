module.exports = (sequelize, DataTypes) => {
  const Reserve = sequelize.define('Reserve', {
    name: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
  });

  Reserve.associate = (models) => {
    Reserve.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  Reserve.associate = (models) => {
    Reserve.belongsTo(models.Furniture, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Reserve;
};
