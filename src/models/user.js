const mongoose = require("mongoose");
const joi = require("@hapi/joi");

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

const model = mongoose.model("User", schema);

module.exports = model;
