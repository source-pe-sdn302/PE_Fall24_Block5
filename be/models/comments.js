const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const commentsSchema = new Schema({
  username: String,
  text: String,
  createAt: Date,
});

const Comments = mongoose.model("Comments", commentsSchema, "Comments");

module.exports = Comments;
