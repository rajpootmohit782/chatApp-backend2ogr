const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    // Find the user with the given email
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // If credentials are valid, generate a JWT token with the user's id
    const secretKey = "secretkey"; // Replace with a secure secret key for JWT
    const payload = { userId: user.id, email: email };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    // Return success message and the JWT token to the frontend
    return res.status(200).json({ msg: "Login successful", token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
