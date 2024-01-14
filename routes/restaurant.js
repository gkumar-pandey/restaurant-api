const express = require("express");
const {
  createRestaurant,
  readRestaurantsHandler,
  readAllRestaurantsHandler,
  readRestaurantByCousineHandler,
  deleteRestaurantHandler,
  searchRestaurantsByLocation,
} = require("../controller/restaurant.controller");
const restaurantRoute = express.Router();

restaurantRoute.post("/", createRestaurant);
restaurantRoute.get("/:name", readRestaurantsHandler);
restaurantRoute.get("/", readAllRestaurantsHandler);
restaurantRoute.get("/cuisine/:cuisineType", readRestaurantByCousineHandler);
restaurantRoute.delete("/:restaurantId", deleteRestaurantHandler);
restaurantRoute.get("/search", searchRestaurantsByLocation);

module.exports = restaurantRoute;
