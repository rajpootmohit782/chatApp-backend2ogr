const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const cors = require("cors");
const User = require("./models/user");

const signupController = require("./controllers/signup");
const app = express();
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

// Set up routes
app.post("/signup", signupController.postAddUser);

// Sync database and start the server
sequelize
  .sync({ force: true }) // Note: { force: true } will drop the existing tables and recreate them (use false in production)
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
