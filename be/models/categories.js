const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const categoriesSchema = new Schema({
  name: String,
  description: String,
});

const Categories = mongoose.model("Categories", categoriesSchema, "Categories");

module.exports = Categories;
