const jsSHA = require("jssha");
const SALT = process.env.SALT;

const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
const pw = `supercomposer123-${SALT}`;
shaObj.update(pw);
const pwHash = shaObj.getHash("HEX");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 99,
          username: "supercomposer",
          password: pwHash,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "songs",
      [
        {
          title: "DoReMi",
          song_data: "asdadadsdffdsf",
          creator_id: 99,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("songs", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
