const mongoose = require("mongoose");
const joi = require("@hapi/joi");
const { DEFAULT_SEARCH_FIELD } = require("../utils/constants");

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
      type: String,
      required: true,
      unique: true,
    },
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
    'typeof:', typeof(searchValue)
  );
  let reg = new RegExp(searchValue, "i");
  let data;
  let params = {};
  if (!searchField || searchField === DEFAULT_SEARCH_FIELD) {
    // data = await this.find().exec();
  } else {
    params = {
      [searchField]: { $regex: reg },
    };
  }
  data = await this.find(params).exec();
  return data;
  // try {
  //   let ret = await new Promise((resolve, reject) => {
  //     this.find(params).exec(function (err, doc) {
  //       if (err) {
  //         reject(`fail to find set by author:${searchField}` + searchValue);
  //       } else {
  //         if (!doc.length) {
  //           reject(`the result is empty search by author:${searchField}` + searchValue);
  //         } else {
  //           resolve(doc);
  //         }
  //       }
  //     });
  //   });
  //   return ret;
  // } catch (error) {
  //   throw error;
  // }
};

const model = mongoose.model("Customer", schema);

module.exports = model;
