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
  updateRestaurantHandler,
} = require("../../../controller/restaurant.controller");
const restaurantRoute = express.Router();

// GET /api/v1/restaurants/search - Retrieve restaurant by location
restaurantRoute.get("/search", searchRestaurantByLocation);

// GET /api/v1/restaurants - Retrieve all restaurants
restaurantRoute.get("/", readAllRestaurantsHandler);

// GET /api/v1/restaurants/:name - Retrieve a restaurant by name
restaurantRoute.get("/:name", readRestaurantsHandler);

// GET /api/v1/restaurants/cuisine/:cuisineType - Retrieve restaurants by cuisine name
restaurantRoute.get("/cuisine/:cuisineType", readRestaurantByCousineHandler);

// POST /api/v1/restaurants - Create new restaurant
restaurantRoute.post("/", createRestaurant);

// POST /api/v1/restaurants/:restaurantId - Update restaurant data
restaurantRoute.post("/:restaurantId", updateRestaurantHandler);

// DELETE /api/v1/restaurants/restaurantId - delete a restaurant
restaurantRoute.delete("/:restaurantId", deleteRestaurantHandler);

// GET /api/v1/restaurants/rating/:minRating - Retrieve filtered restaurants greater than minimum rating
restaurantRoute.get("/rating/:minRating", filterRestaurantByRating);

// POST /api/v1/restaurants/:restaurantId/menu - Add a new dish to the menus of a restaurant
restaurantRoute.post("/:restaurantId/menu", addDishToMenuHandler);

// DELETE /api/v1/restaurants/:restaurantId/menu/:dishId - Delete a dish from menus of a restaurant
restaurantRoute.delete(
  "/:restaurantId/menu/:dishId",
  deleteDishFromMenuHandler
);

// POST /api/v1/restaurants/:restaurantId/reviews - Add review to the restaurant
restaurantRoute.post("/:restaurantId/reviews", addRestaurantRatingAndReviews);

// GET /api/v1/restaurants/:restaurantId/reviews - Retrieve all reviews of a restaurant
restaurantRoute.get("/:restaurantId/reviews", getUsersReviewsOfRestaurant);

module.exports = restaurantRoute;
