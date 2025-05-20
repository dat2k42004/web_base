const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const mongoose = require("mongoose");
router.post("/", async (request, response) => {});

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

module.exports = router;
