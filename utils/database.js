const Sequelize = require("sequelize");

const sequelize = new Sequelize("chatapp1", "mohitrajpoot", "mohitrajpoot", {
  host: "db4free.net",
  dialect: "mysql",
});

module.exports = sequelize;
