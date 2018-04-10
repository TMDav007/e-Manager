export default (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    centerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {});
  Center.associate = (models) => {
    // associations can be defined here
    Center.hasMany(models.Event, {
      foreignKey: 'centerId',
    });
    Center.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Center;
};
