const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["processing", "accepted", "finished"],
      default: "processing",
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
      required: true,
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
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Order", schema);

module.exports = model;
