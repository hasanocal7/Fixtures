module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Token, {
      onDelete: 'cascade',
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Reserve, {
      onDelete: 'cascade',
    });
  };

  return User;
};
