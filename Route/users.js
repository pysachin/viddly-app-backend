const interceptorAuth = require("../Middleware/interceptor");
const config = require("config");
const jwt = require("jsonwebtoken");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.get("/me", interceptorAuth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) res.status(404).send("The user not found");
  else res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  let users = new User(
    _.pick(req.body, ["name", "email", "password", "isAdmin"])
  );

  const salt = await bcrypt.genSalt(10);
  users.password = await bcrypt.hash(users.password, salt);

  try {
    //course.validate() ## validate before save
    await users.save();

    //console.log(result);
    const token = users.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(users, ["_id", "name", "email", "isAdmin"]));
  } catch (ex) {
    console.log(ex.message);

    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
    res.status(400).send("Server Error !!!");
  }
});

router.put("/:id", async (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const { error } = Joi.validate(req.body, schema);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const users = await User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!users) {
    return res.status(404).send("The users id not found");
  }

  res.send(users);
});

router.delete("/:id", async (req, res) => {
  const users = await User.findByIdAndRemove(req.params.id);

  if (!users) {
    return res.status(404).send("The users id not found");
  }

  res.send(users);
});

module.exports = router;
