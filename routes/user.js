const fs = require("fs");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var usersModel = require("../models/user");
const router = express.Router();

//
var {
  saveuser,
  getuserById,
  updateuserById,
  deleteuserById,
  getAllusers,
} = require("../controllers/user");
const { error } = require("console");
console.log(process.env.SECRET);
//==============================================

// get all users

router.get("/", async (req, res) => {
  try {
    var users = await getAllusers();
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// save users

router.post("/signup", async (req, res) => {
  var user = req.body;

  try {
    var newuser = await saveuser(user);
    // newuser.save();
    res.status(201).json({ data: newuser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get user by id

router.get("/:id", async (req, res) => {
  var { id } = req.params;
  try {
    var newuser = await getuserById(id);
    if (newuser) {
      res.status(201).json({ data: newuser });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update user by id
router.patch("/:id", async (req, res) => {
  var { password } = req.body;
  var { id } = req.params;
  try {
    var user = await updateuserById(id, password);
    if (user) {
      res.status(200).json({ message: "updated", data: user });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete user by id
router.delete("/:id", async (req, res) => {
  var { id } = req.params;
  try {
    var newuser = await deleteuserById(id);
    if (newuser) {
      res.status(201).json({ message: "Deleted", data: newuser });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/login", async function (req, res) {
  var { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(404)
      .json({ message: "please provide username and password" });
  }
  try {
    var user = await usersModel.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: "invalid username or password" });
    }
    var isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "invalid username  or password" });
    }
    //                      paylod                     secret key
    var token = jwt.sign(
      { id: user._id, name: user.username },
      process.env.SECRET
    );
    res.status(200).json({ token, status: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
