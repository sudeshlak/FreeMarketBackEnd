import mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: String // String is shorthand for {type: String}
  }
);

module.exports = mongoose.model('Category', CategorySchema);