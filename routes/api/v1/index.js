const express = require("express");
const routes = express.Router();
const restaurantRoute = require("./restaurants.route");

routes.use("/restaurants", restaurantRoute);

module.exports = routes;
