const mongoose = require("mongoose");
const { DEFAULT_SEARCH_FIELD } = require("../utils/constants");

const schema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
      unique: true,
    },
    businesses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.statics.searchByFilter = async function (searchValue, searchField) {
  console.log(
    "----------searchValue: start",
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
      $or: [{ serviceName: { $regex: reg } }, { description: { $regex: reg } }],
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
  data = await this.find(params).exec();
  return data;
};

const model = mongoose.model("Category", schema);

module.exports = model;
