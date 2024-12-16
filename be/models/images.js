const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const imagesSchema = new Schema({
  path: String,
  url: String,
  caption: String,
  createAt: Date,
});

const Images = mongoose.model("Images", imagesSchema, "Images");

module.exports = Images;
