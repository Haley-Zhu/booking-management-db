const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const schema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    preferName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email) => !joi.string().email().validate(email).error,
        msg: "Invalid email format",
      },
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const model = mongoose.model("Customer", schema);

module.exports = model;
