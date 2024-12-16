const mongoose = require("mongoose");
const Categories = require("./categories");
const Comments = require("./comments");
const Images = require("./images");
const Tutorials = require("./tutorials");

const db = {};
db.Categories = Categories;
db.Comments = Comments;
db.Images = Images;
db.Tutorials = Tutorials;
// Define schema

module.exports = db;
