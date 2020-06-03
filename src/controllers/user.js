const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

async function addUser(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json("user has already existed");
  }

  const user = new User({
    name,
    email,
    password,
  });
  await user.save();
  const token = generateToken(user._id);
  return res.json({ name, token });
}

async function getUser(req, res) {
  const { id } = req.params;
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(404).json("user is not found");
  }

  return res.json(user);
}

async function getAllUsers(req, res) {
  const users = await User.find().exec();
  if (!users) {
    return res.status(404).json("users are not found");
  }
  return res.json(users);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name, password } = req.body;

  const existingUser = await User.findById(id);
  if (!existingUser) {
    return res.status(404).json("user is not found");
  }
  if (name !== existingUser.name) {
    return res.status(403).json("username cannot be changed");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, password },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(500).json("updating user failed");
  }
  return res.json(updatedUser);
}

async function deleteUser(req, res) {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndRemove(id);
  if (!deletedUser) {
    return res.status(404).json("user is not found");
  }

  return res.sendStatus(200);
}

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
