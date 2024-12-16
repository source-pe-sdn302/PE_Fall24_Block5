const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const tutorialsSchema = new Schema({
  title: String,
  author: String,
  images: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Images",
      },
      url: String,
      caption: String,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  tags: [],
});

const Tutorials = mongoose.model("Tutorials", tutorialsSchema, "Tutorials");

module.exports = Tutorials;
