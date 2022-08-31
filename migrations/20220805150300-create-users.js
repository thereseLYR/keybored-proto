module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("now"),
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("now"),
        },
      },
      { underscored: true }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
