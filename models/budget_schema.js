const mongoose = require("mongoose");

var optionalWithLength = function (minLength, maxLength) {
  minLength = minLength || 0;
  maxLength = maxLength || Infinity;
  return {
    validator: function (value) {
      if (value === undefined) return true;
      return value.length >= minLength && value.length <= maxLength;
    },
    message:
      "Optional field is shorter than the minimum allowed length (" +
      minLength +
      ") or larger than the maximum allowed length (" +
      maxLength +
      ")",
  };
};

const budgetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      uppercase: true,
      validate: optionalWithLength(6, 7),
    },
  },
  { collection: "budgets" }
);

module.exports = mongoose.model("budgets", budgetSchema);
