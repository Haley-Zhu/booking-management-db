const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (email) => !joi.string().email().validate(email).error,
        msg: "Invalid email format",
      },
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Customer", schema);

module.exports = model;
