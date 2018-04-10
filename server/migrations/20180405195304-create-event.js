
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    center: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    eventType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    others: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    centerId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'set null',
      references: {
        model: 'Centers',
        key: 'id',
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Events')
};
