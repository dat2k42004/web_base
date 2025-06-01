const express = require("express");
const User = require("../db/userModel");
const router = express.Router();
const session = require('express-session');


const authMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  next();
};



router.get("/list", async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users);
    res.json(users);
  } catch (error) {
    res.send({
    })
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {

  }
});


router.post("/register", async (req, res) => {
  try {
    console.log("res - body", req.body.login_name);
    const user = await User.findOne({ login_name: req.body.login_name });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      login_name: req.body.login_name,
      password: req.body.password,
      location: req.body.location,
      description: req.body.description,
      occupation: req.body.occupation,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ error: "Internal server error" });

  }
})

router.use((req, res, next) => {
  if (['/login', '/logout'].includes(req.path)) return next();
  return authMiddleware(req, res, next);
});

router.post('/login', async (req, res) => {
  // console.log(req.body);
  const { login_name, password } = req.body;
  const user = await User.findOne({ login_name: login_name, password: password });
  // console.log(user);
  if (!user) {
    return res.status(400).send({ error: 'Invalid login name or password' });
  }

  req.session.userId = user._id;
  res.send(user);
});

router.post('/logout', (req, res) => {
  if (!req.session.userId) {
    return res.status(400).send({ error: 'No user is logged in' });
  }

  req.session.destroy();
  res.sendStatus(200);
});




module.exports = router;
