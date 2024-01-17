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

// GET /restaurants/search - Retrieve restaurant by location
restaurantRoute.get("/search", searchRestaurantByLocation);

// GET /restaurants - Retrieve all restaurants
restaurantRoute.get("/", readAllRestaurantsHandler);

// GET /restaurants/:name - Retrieve a restaurant by name
restaurantRoute.get("/:name", readRestaurantsHandler);

// GET /restaurants/cuisine/:cuisineType - Retrieve restaurants by cuisine name
restaurantRoute.get("/cuisine/:cuisineType", readRestaurantByCousineHandler);

// POST /restaurants - Create new restaurant
restaurantRoute.post("/", createRestaurant);

// DELETE /restaurants/restaurantId - delete a restaurant
restaurantRoute.delete("/:restaurantId", deleteRestaurantHandler);

// GET /restaurants/rating/:minRating - Retrieve filtered restaurants greater than minimum rating
restaurantRoute.get("/rating/:minRating", filterRestaurantByRating);

// POST /restaurants/:restaurantId/menu - Add a new dish to the menus of a restaurant
restaurantRoute.post("/:restaurantId/menu", addDishToMenuHandler);

// DELETE /restaurants/:restaurantId/menu/:dishId - Delete a dish from menus of a restaurant
restaurantRoute.delete(
  "/:restaurantId/menu/:dishId",
  deleteDishFromMenuHandler
);

// POST /restaurants/:restaurantId/reviews - Add review to the restaurant
restaurantRoute.post("/:restaurantId/reviews", addRestaurantRatingAndReviews);

// GET /restaurants/:restaurantId/reviews - Retrieve all reviews of a restaurant
restaurantRoute.get("/:restaurantId/reviews", getUsersReviewsOfRestaurant);

module.exports = restaurantRoute;
