const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

async function loginUser(req, res) {
  const { name, password } = req.body;

  const existingUser = await User.findOne({ name });
  if (!existingUser) {
    return res.status(401).json("Invalid username or password");
  }
  if (existingUser.password !== password) {
    return res.status(401).json("Invalid username or password");
  }

  const token = generateToken(existingUser._id);
  return res.json({ name, token });
}

module.exports = {
  loginUser,
};
