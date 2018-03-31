export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    center: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    others: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Event.associate = (models) => {
    // associations can be defined here
    Event.belongsTo(models.Center, {
      foreignKey: 'centerName',
      onDelete: 'CASCADE',
    });
    Event.belongsTo(models.User, {
      foreignKey: 'email',
      onDelete: 'CASCADE',
    });
  };
  return Event;
};
