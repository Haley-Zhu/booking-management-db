const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    ABN: {
      type: String,
      required: true,
      default: "",
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => !joi.string().email().validate(email).error,
        msg: "Invalid email format",
      },
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    streeAddress: {
      type: String,
      required: true,
      default: "",
    },
    postcode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      uppercase: true,
      required: true,
      enum: ["NSW", "VIC", "QLD", "WA", "TAS", "SA", "ACT", "NT"],
    },
    rate: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Business", schema);

module.exports = model;
