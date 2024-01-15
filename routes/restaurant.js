const express = require("express");
const {
  createRestaurant,
  readRestaurantsHandler,
  readAllRestaurantsHandler,
  readRestaurantByCousineHandler,
  deleteRestaurantHandler,
  searchRestaurantByLocation,
  filterRestaurantByRating,
  addDishToMenuHandler,
} = require("../controller/restaurant.controller");
const restaurantRoute = express.Router();

restaurantRoute.get("/search", searchRestaurantByLocation);
restaurantRoute.get("/", readAllRestaurantsHandler);
restaurantRoute.get("/:name", readRestaurantsHandler);
restaurantRoute.get("/cuisine/:cuisineType", readRestaurantByCousineHandler);
restaurantRoute.post("/", createRestaurant);
restaurantRoute.delete("/:restaurantId", deleteRestaurantHandler);
restaurantRoute.get("/rating/:minRating", filterRestaurantByRating);
restaurantRoute.post("/:restaurantId/menu", addDishToMenuHandler);

module.exports = restaurantRoute;
