const mongoose = require("mongoose");
const joi = require("@hapi/joi");
const { DEFAULT_SEARCH_FIELD } = require("../utils/constants");

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
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.statics.searchByFilter = async function (searchValue, searchField) {
  console.log(
    "----------searchValue:",
    searchValue,
    "searchField",
    searchField,
    "typeof:",
    typeof searchValue
  );
  let reg = new RegExp(searchValue, "i");
  let data;
  let params = {};
  if (!searchField || searchField === DEFAULT_SEARCH_FIELD) {
    params = {
      $or: [
        { name: { $regex: reg } },
        { email: { $regex: reg } },
        { phone: { $regex: reg } },
        { postcode: { $regex: reg } },
      ],
    };
  } else {
    params = {
      [searchField]: { $regex: reg },
    };
  }
  console.log(
    "searchField: ",
    searchField,
    "DEFAULT_SEARCH_FIELD: ",
    DEFAULT_SEARCH_FIELD,
    "equal: ?",
    searchField === DEFAULT_SEARCH_FIELD
  );
  console.log("params: ", params);
  data = await this.find(params).populate("categories", "serviceName");
  return data;
};

const model = mongoose.model("Business", schema);

module.exports = model;
