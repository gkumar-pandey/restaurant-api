const express = require("express");
const { signup } = require("../../../controller/user.controller");

const userRoutes = express.Router();

userRoutes.post("/signup", signup);

module.exports = {
  userRoutes,
};
