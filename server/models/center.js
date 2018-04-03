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
      foreignKey: 'center',
      onDelete: 'CASCADE',
    });
    Center.belongsTo(models.User, {
      foreignKey: 'centerName',
      onDelete: 'CASCADE',
    });
  };
  return Center;
};
