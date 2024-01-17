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
  deleteDishFromMenuHandler,
  addRestaurantRatingAndReviews,
  getUsersReviewsOfRestaurant,
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
restaurantRoute.delete(
  "/:restaurantId/menu/:dishId",
  deleteDishFromMenuHandler
);
restaurantRoute.post("/:restaurantId/reviews", addRestaurantRatingAndReviews);
restaurantRoute.get("/:restaurantId/reviews", getUsersReviewsOfRestaurant);

module.exports = restaurantRoute;
