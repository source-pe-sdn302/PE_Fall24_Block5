const express = require("express");
const db = require("../models");

const ApiRouter = express.Router();

ApiRouter.get("/tutorials", async (req, res, next) => {
  try {
    const tutorials = await db.Tutorials.find()
      .populate("comments")
      .populate("category");
    res.status(200).json(
      tutorials.map((t) => {
        return {
          _id: t._id,
          title: t.title,
          author: t.author,
          images: t.images.map((i) => {
            return {
              _id: i._id,
              url: i.url,
              caption: i.caption,
            };
          }),
          comments: t.comments.map((c) => {
            return {
              _id: c._id,
              username: c.username,
              text: c.text,
              createAt: c.createAt,
            };
          }),
          category: {
            name: t.category.name,
            description: t.category.description,
          },
        };
      })
    );
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.get("/tutorial/:id/comments", async (req, res, next) => {
  try {
    const id = req.params.id;
    const tutorials = await db.Tutorials.findById(id)
      .populate("comments")
      .populate("category");
    res.status(200).json(
      tutorials.comments.map((c) => {
        return {
          _id: c._id,
          username: c.username,
          text: c.text,
          createAt: c.createAt,
        };
      })
    );
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.post("/tutorials/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, text } = req.body;
    const tutorialRaw = await db.Tutorials.findById(id).populate("comments");
    if (!tutorialRaw) {
      return res.status(500).json({
        error: 500,
        message: "Id not found",
      });
    }
    const newComment = new db.Comments({
      username: username,
      text: text,
      createAt: new Date(),
    });
    console.log("test: ", newComment);
    await newComment.save();

    tutorialRaw.comments.push(newComment._id);
    await tutorialRaw.save();
    return res.status(200).json({
      username: newComment.username,
      text: newComment.text,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = ApiRouter;
