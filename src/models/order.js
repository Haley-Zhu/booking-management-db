const mongoose = require("mongoose");
const { DEFAULT_SEARCH_FIELD } = require("../utils/constants");

const schema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["ongoing", "finished", "cancelled "],
      default: "ongoing",
    },
    orderEstimatedTime: {
      type: Date,
    },
    orderFinishedTime: {
      type: Date,
    },
    orderLocation: {
      type: String,
      default: "",
    },
    rate: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 5,
      validate: (rate) => {
        if (rate < 0 || rate > 5) {
          return false;
        }
        return true;
      },
    },
    comment: {
      type: String,
      default: "",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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
    "typeof:",
    typeof searchValue
  );
  let reg = new RegExp(searchValue, "i");
  let data;
  let params = {};
  if (!searchField || searchField === DEFAULT_SEARCH_FIELD) {
    params = {
      // $or: [
        // { "customer.name": { $regex: reg } },
        // { "email": { $regex: reg } },
        // { "phone": { $regex: reg } },
      // ],
    };
    console.log('################# params:', params);
  } else {
    params = {
      [searchField]: { $regex: reg },
    };
  }
  data = await this.find()
    .populate("customer", "name")
    .populate("business", "name")
    .populate("category", "serviceName")
    .where('customer').equals('aaa')
    // .find(params).exec()
    // .exec((err, doc) => {
    //   console.log('@@@@@@@@@@@@@ doc', doc);
    //   return doc;
    // });
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

const model = mongoose.model("Order", schema);

module.exports = model;
