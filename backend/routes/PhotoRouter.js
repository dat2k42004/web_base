const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const mongoose = require("mongoose");
router.post("/", async (request, response) => { });

router.get("/", async (request, response) => {
  response.json(await Photo.find());
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const photos = await Photo.find({
      user_id: userId,
    });
    res.json(photos);
  } catch (error) {

  }
});

router.post("/comment/:photo_id", async (req, res) => {
  try {
    const photo_id = req.params.photo_id;
    const { user_id, comment } = req.body;

    console.log("Received comment: ", req.body);

    await Photo.updateOne(
      { _id: photo_id },
      {
        $push: {
          comments: {
            comment: comment,
            date_time: new Date(),
            user_id: user_id,
          }
        }
      }
    );

    res.status(200).json({ message: "Add Comment successfully" });
  } catch (error) {
    console.error("Error in /comment/:photo_id:", error);
    res.status(400).json({ error: "Error adding comment" });
  }
});


router.post("/new", async (req, res) => {
  try {
    const { user_id, file_name } = req.body;
    console.log("body:", req.body);

    const newPhoto = new Photo({
      user_id: user_id,
      file_name: file_name,
      date_time: new Date(),
      comments: [],
    })

    await newPhoto.save();
    res.status(200).json({
      message: "Photo added successfully",
      photo: newPhoto,
    });
  } catch (error) {
    console.error("Error in /new:", error);
    res.status(400).json({ error: "Error adding photo" });

  }
})

module.exports = router;
