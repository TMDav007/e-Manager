
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
    userId: {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'email'
      }
    },
    Center: {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      references: {
        model: 'Centers',
        key: 'centerName'
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
