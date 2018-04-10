export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Event, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Center, {
      foreignKey: 'userId',
    });
  };
  return User;
};
