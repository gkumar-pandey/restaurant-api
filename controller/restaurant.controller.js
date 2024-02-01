const Restaurant = require("../model/restaurant");

/**
 * @route POST /api/v1/restaurants
 * @description Create a new restaurant and save to database.
 * @param {Object} req Express objects containing restaurant deatials on body.
 * @param {Object[]} res - Express Response contains error or saved restaurant.
 */
const createRestaurant = async (req, res) => {
  try {
    const restaurant = req.body;
    const newRestaurant = new Restaurant(restaurant);
    const savedRestaurant = await newRestaurant.save();
    if (!savedRestaurant) {
      return res
        .status(500)
        .json({ success: false, message: "Restaurant not saved!" });
    }
    res.status(201).json({
      success: true,
      message: "Restaurant saved.",
      data: { restaurants: savedRestaurant },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
    throw error;
  }
};

/**
 * @route GET /api/v1/restaurants/:name
 * @description Retrieve a restaurant details by restaurant name and send as response.
 * @param {Object} req Express request contains restaurant name as params in request object.
 * @param {Object[]} res Express response contains error or a restaurant data.
 */
const readRestaurantsHandler = async (req, res) => {
  try {
    const name = req.params.name;
    const foundRestaurant = await Restaurant.find({ name: name });
    if (foundRestaurant.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurants not found",
        data: { restaurants: foundRestaurant },
      });
    }
    return res
      .status(200)
      .json({ success: true, data: { restaurants: foundRestaurant } });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error, message: "Internal server error" });
    throw error;
  }
};

/**
 * @route GET /api/v1/restaurants
 * @description Retrieve all restaurants
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} - A JSON response containing an array of restaurant data or an error message
 */
const readAllRestaurantsHandler = async (req, res) => {
  try {
    const foundAllRestaurant = await Restaurant.find();
    if (foundAllRestaurant.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurants not found",
        data: { restaurants: foundAllRestaurant },
      });
    }
    return res
      .status(200)
      .json({ success: true, data: { restaurants: foundAllRestaurant } });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
    throw error;
  }
};

/**
 * @route GET /api/v1/restaurants/cuisine/:cuisineType
 * @param {Object} req - The request object containing the cuisine type in params
 * @param {Object} res - The response object containing an array of restaurants for a specific cuisine
 * @returns {JSON} - A JSON response with either an array of restaurants or an error message
 */
const readRestaurantByCousineHandler = async (req, res) => {
  try {
    const cuisineType = req.params.cuisineType;
    const restaurantFound = await Restaurant.find({ cuisine: cuisineType });
    if (restaurantFound.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurants not found.",
        data: { restaurants: restaurantFound },
      });
    }
    return res
      .status(200)
      .json({ success: true, data: { restaurants: restaurantFound } });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error, success: false, message: "Internal server error" });
    throw error;
  }
};

/**
 * @route POST /api/v1/restaurants/:restaurantId
 * @description Handles the update operation for a specific restaurant identified by the provided restaurantId.
 * @param {Object} req - The request object containing update data in the body and the restaurant ID in params.
 * @param {Object} res - The response object containing information about the updated restaurant.
 * @returns {JSON} - A JSON response indicating the success or failure of the update operation and, if successful, the updated restaurant data.
 */
const updateRestaurantHandler = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const updateData = req.body;

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updateData,
      { new: true }
    );
    if (!updatedRestaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not updated." });
    }
    return res.json({
      success: true,
      message: "Restaurant updated successfully.",
      data: { restaurant: updatedRestaurant },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error, success: false, message: "Internal server error" });
    throw error;
  }
};

/**
 * @route DELETE /api/v1/restaurants/:restaurantId
 * @description Handles the deletion of a restaurant identified by the provided restaurantId.
 * @param {Object} req - The request object containing the restaurant ID in params.
 * @param {Object} res - The response object containing information about the deleted restaurant.
 * @returns {JSON} - A JSON response indicating the success or failure of the deletion operation and, if successful, the deleted restaurant data.
 * @throws Will throw an error if there are issues during the deletion process, triggering an internal server error response.
 */
const deleteRestaurantHandler = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!deletedRestaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not deleted." });
    }

    return res.status(200).json({
      success: true,
      message: "deleted successfully",
      restaurant: deletedRestaurant,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error, message: "Internal server error" });
    throw error;
  }
};

/**
 * @route GET /api/v1/restaurants/search
 * @description Retrieves an array of restaurants based on the provided location query parameter.
 * @param {Object} req - The request object containing the location in the query.
 * @param {Object} res - The response object containing an array of restaurants data for the specified location.
 * @returns {JSON} - A JSON response indicating the success or failure of the search operation and, if successful, the array of found restaurants.
 * @throws Will throw an error if there are issues during the search process, triggering an internal server error response.
 */
const searchRestaurantByLocation = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res
        .status(400)
        .json({ error: "Location is required for the search" });
    }

    const foundRestaurants = await Restaurant.find({ city: location });

    if (foundRestaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No restaurants found matching the location",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        restaurants: foundRestaurants,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error, message: "Internal server error" });
    throw error;
  }
};

/**
 * @route GET /api/v1/restaurants/rating/:minRating
 * @description Retrieves an array of restaurants with ratings greater than or equal to the specified minimum rating.
 * @param {Object} req - The request object containing the minimum rating in params.
 * @param {Object} res - The response object containing an array of restaurants with ratings >= minRating.
 * @returns {JSON} - A JSON response indicating the success or failure of the filtering operation and, if successful, the array of found restaurants.
 * @throws Will throw an error if there are issues during the filtering process, triggering an internal server error response.
 */
const filterRestaurantByRating = async (req, res) => {
  try {
    const minRating = req.params.minRating;
    if (!minRating) {
      return res.status(400).json({
        success: false,
        message: "Rating is required for filter restaurant by rating",
      });
    }
    const foundRestaurants = await Restaurant.find({
      rating: { $gte: minRating },
    });
    if (foundRestaurants.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurants not found" });
    }
    return res
      .status(200)
      .json({ success: true, data: { restaurants: foundRestaurants } });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error, message: "Internal server error" });
    throw error;
  }
};

/**
 * @route POST /api/v1/restaurants/:restaurantId/menu
 * @description Adds a new dish to the menu of a specific restaurant identified by the provided restaurantId.
 * @param {Object} req - The request object containing restaurant ID in params and menu data in the body.
 * @param {Object} res - The response object containing restaurant data with the new dish added to the menu.
 * @returns {JSON} - A JSON response indicating the success or failure of the dish addition operation and, if successful, the updated restaurant data.
 * @throws Will throw an error if there are issues during the dish addition process, triggering an internal server error response.
 */
const addDishToMenuHandler = async (req, res) => {
  try {
    const menu = req.body;
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    restaurant.menu.push(menu);
    await restaurant.save();

    return res.status(201).json({
      message: "menu is added.",
      success: true,
      data: { restaurant: restaurant },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error, message: "Internal server error" });
    throw error;
  }
};

/**
 * @route DELETE /api/v1/restaurants/:restaurantId/menu/:dishId
 * @description Deletes a dish from the menu of a specific restaurant identified by the provided restaurantId and dishId.
 * @param {Object} req - The request object containing restaurant ID and dish ID in params.
 * @param {Object} res - The response object containing restaurant data after the dish is deleted from the menu.
 * @returns {JSON} - A JSON response indicating the success or failure of the dish deletion operation and, if successful, the updated restaurant data.
 * @throws Will throw an error if there are issues during the dish deletion process, triggering an internal server error response.
 */
const deleteDishFromMenuHandler = async (req, res) => {
  try {
    const { restaurantId, dishId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const dishIndex = restaurant.menu.findIndex((dish) => dish._id == dishId);

    if (dishIndex == -1) {
      return res
        .status(404)
        .json({ success: false, message: "Dish not found in menu" });
    }
    restaurant.menu.splice(dishIndex, 1);
    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "Dish deleted successfully",
      restaurant,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error, message: "Internal server error" });
    throw error;
  }
};

/**
 * @route POST /api/v1/restaurants/:restaurantId/reviews
 * @description Adds a new review with rating and text to the specified restaurant identified by restaurantId.
 * @param {Object} req - The request object containing restaurant ID in params and review data (userId, rating, text) in the body.
 * @param {Object} res - The response object containing restaurant data with the new review added.
 * @returns {JSON} - A JSON response indicating the success or failure of the review addition operation and, if successful, the updated restaurant data.
 * @throws Will throw an error if there are issues during the review addition process, triggering an internal server error response.
 */
const addRestaurantRatingAndReviews = async (req, res) => {
  try {
    const { userId, rating, text } = req.body;
    const restaurantId = req.params.restaurantId;
    const reviewData = {
      userId,
      rating,
      text,
    };

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    restaurant.reviews.push(reviewData);

    const averageRating = restaurant.reviews.reduce(
      (acc, curr) => (acc = acc + curr.rating),
      0
    );

    restaurant.averageRating = averageRating / restaurant.reviews.length;
    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "Review added succesfully",
      restaurant: restaurant,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error, message: "Internal server error" });
    throw error;
  }
};

/**
 * @route GET /api/v1/restaurants/:restaurantId/reviews
 * @description Retrieves an array of reviews for a specific restaurant identified by restaurantId.
 * @param {Object} req - The request object containing the restaurant ID in params.
 * @param {Object} res - The response object containing an array of reviews with user information.
 * @returns {JSON} - A JSON response indicating the success or failure of the reviews retrieval operation and, if successful, the array of reviews.
 * @throws Will throw an error if there are issues during the reviews retrieval process, triggering an internal server error response.
 */
const getUsersReviewsOfRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: "reviews",
      populate: {
        path: "userId",
        select: "username",
      },
    });
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    const reviews = restaurant.reviews;

    return res.status(200).json({ success: true, reviews: reviews });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error, message: "Internal server error" });
    throw error;
  }
};

module.exports = {
  createRestaurant,
  readRestaurantsHandler,
  readAllRestaurantsHandler,
  readRestaurantByCousineHandler,
  updateRestaurantHandler,
  deleteRestaurantHandler,
  searchRestaurantByLocation,
  filterRestaurantByRating,
  addDishToMenuHandler,
  deleteDishFromMenuHandler,
  addRestaurantRatingAndReviews,
  getUsersReviewsOfRestaurant,
};
