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

schema.statics.searchByFilter = async function (searchValue) {
  let reg = new RegExp(searchValue, "i");
  let params = {
    name: { $regex: reg },
  };
  const data = await this.find(params).exec();
  return data;
};

const model = mongoose.model("Customer", schema);

module.exports = model;
