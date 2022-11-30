const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.postAddUser = async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  try {
    let existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const newUser = await User.create({
        name: name,
        email: email,
        phone: phone,
        password: hash,
      });
      res.status(201).json({ newSignUp: newUser });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
