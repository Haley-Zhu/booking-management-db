const User = require('../models/user');

async function addUser(req, res){
  const { name, password } = req.body;
  const user = new User({
    name,
    password
  });
  
  await user.save();
  return res.json(user);
}

function getUser(req, res){}

async function getAllUsers(req, res){
  const users = await User.find();
  return res.json(users);
}

function updateUser(req, res){}

function deleteUser(req, res){}

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
}