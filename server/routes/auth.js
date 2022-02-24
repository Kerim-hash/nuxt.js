const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verify-token");
// SIGN UP

router.post("/auth/signup", async function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      message: "Please enter your email or password",
    });
  } else {
    try {
      const newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      await newUser.save();
      let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
        expiresIn: 604800,
      });

      res.json({
        success: true,
        token: token,
        message: "Successfully created a new user",
      });

    } catch (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
    }
  }
});

// get request - User
router.put("/auth/user", verifyToken, async (req, res) => {
  try {
    let foundUser = await User.findOne({ _id: req.decoded._id });
    if (foundUser) {
      if(req.body.name) foundUser.name = req.body.name;
      if(req.body.email) foundUser.email = req.body.email;
      if(req.body.password) foundUser.password  = req.body.password;
    }
    await foundUser.save();
    res.json({
      success: true,
      message: "Successfully update",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      err: err.message,
    });
  }
});

router.get("/auth/user", verifyToken, async (req, res) => {
  try {
    let foundUser = await User.findOne({ _id: req.decoded._id }).populate('address');
    if (foundUser) {
      res.json({
        success: true,
        user: foundUser,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      err: err.message,
    });
  }
});



router.post("/auth/login", async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      res.status(403).send({
        success: false,
        message: "Authorization failed, User not found",
      });
    } else {
      if (foundUser.comparePassword(req.body.password)) {
        let token =  jwt.sign(foundUser.toJSON(), process.env.SECRET, {
          expiresIn: 604800,
        });

        res.json({success: true, token: token})
      } else {
        res.status(403).send({
          success: false,
          message: "Authorization failed, Wrong Password!",
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
