module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "songs",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        song_data: {
          type: Sequelize.STRING,
        },
        creator_id: {
          type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("songs");
  },
};
