const mongoose = require("mongoose");
const {
  DEFAULT_SEARCH_FIELD,
  SEARCH_CUSTOMER,
  SEARCH_BUSINESS,
  SEARCH_CATEGORY,
} = require("../utils/constants");

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
      default: 2,
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
  if (!searchField || searchField === DEFAULT_SEARCH_FIELD) {
    console.log('$$$$$$$$$$$$$$  all')
    data = await this.aggregate(
      [
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "businesses",
            localField: "business",
            foreignField: "_id",
            as: "business",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $unwind: "$business",
        },
        {
          $unwind: "$category",
        },
        {
          $match: {
            $or: [
              { "customer.name": { $regex: reg } },
              { "business.name": { $regex: reg } },
              { "category.serviceName": { $regex: reg } },
            ],
          },
        },
      ],
      (err, doc) => {
        return doc;
      }
    );
  } else if (searchField === SEARCH_CUSTOMER) {
    console.log('$$$$$$$$$$$$$$  customer')
    data = await this.aggregate(
      [
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "businesses",
            localField: "business",
            foreignField: "_id",
            as: "business",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $unwind: "$business",
        },
        {
          $unwind: "$category",
        },
        {
          $match: {
            "customer.name": { $regex: reg },
          },
        },
      ],
      (err, doc) => {
        return doc;
      }
    );}
    else if (searchField === SEARCH_BUSINESS) {
      console.log('$$$$$$$$$$$$$$  business')
      data = await this.aggregate(
        [
          {
            $lookup: {
              from: "customers",
              localField: "customer",
              foreignField: "_id",
              as: "customer",
            },
          },
          {
            $lookup: {
              from: "businesses",
              localField: "business",
              foreignField: "_id",
              as: "business",
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            },
          },
          {
            $unwind: "$customer",
          },
          {
            $unwind: "$business",
          },
          {
            $unwind: "$category",
          },
          {
            $match: {
              "business.name": { $regex: reg },
            },
          },
        ],
        (err, doc) => {
          return doc;
        }
      );
  }
  else {
    console.log('$$$$$$$$$$$$$$  category')
    data = await this.aggregate(
      [
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "businesses",
            localField: "business",
            foreignField: "_id",
            as: "business",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $unwind: "$business",
        },
        {
          $unwind: "$category",
        },
        {
          $match: {
            "category.serviceName": { $regex: reg },
          },
        },
      ],
      (err, doc) => {
        return doc;
      }
    );
  }
  // data = await this.find()
  //   .populate("customer", "name")
  //   .populate("business", "name")
  //   .populate("category", "serviceName");
  return data;
};

const model = mongoose.model("Order", schema);

module.exports = model;
