const mongoose = require("mongoose");
const joi = require("@hapi/joi");
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => !joi.string().email().validate(email).error,
      msg: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

schema.methods.hashPassword = async function() {
  this.password = await bcrypt.hash(this.password, 10);
}

schema.methods.validatePassword = async function(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
}

const model = mongoose.model("User", schema);

module.exports = model;
