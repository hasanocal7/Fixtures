module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('token', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'cascade',
      onDelete: 'cascade',
      references: { model: 'Users', key: 'id' },
    },

    token: {
      type: DataTypes.STRING,
    },
  });
  return Token;
};
