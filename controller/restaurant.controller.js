const Restaurant = require("../model/restaurant");

/**
 * @param {Object} req - Details of restaurant
 * @param {Object[]} res - Saved restaurant
 * @route POST /restaurants
 */

const createRestaurant = async (req, res) => {
  try {
    const restaurant = req.body;
    const newRestaurant = new Restaurant(restaurant);
    const savedRestaurant = await newRestaurant.save();
    if (!savedRestaurant) {
      return res.status(500).json({ error: "Restaurant not saved!" });
    }
    res.status(201).json({ data: { restaurants: savedRestaurant } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @param {Object} req - req object containing restaurant name in params
 * @param {Object[]} res - Restaurant data or error
 * @route GET /restaurants/:name
 */

const readRestaurantsHandler = async (req, res) => {
  try {
    const name = req.params.name;
    const foundRestaurant = await Restaurant.find({ name: name });
    if (foundRestaurant) {
      res.status(200).json({ data: { restaurant: foundRestaurant } });
    } else {
      return res.status(404).json({ error: "Restaurant not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @param {} req
 * @param {Object[]} res - send all restaurants data
 * @route GET /restaurants
 */

const readAllRestaurantsHandler = async (req, res) => {
  try {
    const foundAllRestaurant = await Restaurant.find();
    if (foundAllRestaurant) {
      res.status(200).json({ data: { restaurants: foundAllRestaurant } });
    } else {
      res.status(404).json({ error: "Restaurants not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route GET /restaurants/cuisine/:cuisineType
 * @param {Object} req - The request object containing cuisine name in params
 * @param {Object} res - The respose object containing array of restaurants for a cuisine
 */

const readRestaurantByCousineHandler = async (req, res) => {
  try {
    const cuisineType = req.params.cuisineType;
    const restaurantFounded = await Restaurant.find({ cuisine: cuisineType });
    if (!restaurantFounded) {
      res.status(404).json({ error: "Restaurants not found" });
    } else {
      res.status(200).json({ data: { restaurants: restaurantFounded } });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route POST /reststaurants/:restaurantId
 * @param {Object} req - Object containing update data in body and restaurnat in params
 * @param {Object} res - Object containing with updated restaurants
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
      res.status(404).json({ error: "Restaurant not found!" });
    }
    res.json({ data: { restaurant: updatedRestaurant } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route DELETE /restaurants/:restaurantId
 * @param {Object} req - Object containing restaurnat id in params
 * @param {Object} res - Object containing deleted restaurnat
 */
const deleteRestaurantHandler = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json({
      message: "deleted successfully",
      restaurant: deletedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route GET /restaurants/search
 * @param {Object} req - Object containing location in qyery
 * @param {*} res - Object containing array of restaurants data for location
 *
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
      return res
        .status(404)
        .json({ error: "No restaurants found matching the location" });
    }

    res.status(200).json({
      data: {
        restaurants: foundRestaurants,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route GET /restaurants/rating/:minRating
 * @param {Object} req - Request object containing minimum rating
 * @param {Object} res - Response Object containing Array of of Restaurants whose rating >= min rating
 */
const filterRestaurantByRating = async (req, res) => {
  try {
    const minRating = req.params.minRating;
    if (!minRating) {
      return res
        .status(400)
        .json({ error: "Rating is required for filter restaurant by rating" });
    }
    const foundRestaurants = await Restaurant.find({
      rating: { $gte: minRating },
    });
    if (foundRestaurants.length == 0) {
      return res.status(404).json({ message: "Restaurants not found" });
    }
    res.status(200).json({ data: { restaurants: foundRestaurants } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route POST /restaurants/:restaurantId/menu
 * @param {Object} req - Object containing restaurant id in prams & menu data in body
 * @param {Object} res - Object containing restaurant data with new dish added to the menu
 * @returns
 */
const addDishToMenuHandler = async (req, res) => {
  try {
    const menu = req.body;
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    restaurant.menu.push(menu);
    await restaurant.save();

    res.status(201).json({ message: "menu is added", restaurant: restaurant });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route DELETE /restaurants/:restaurantId/menu/:dishId
 * @param {Object} req - Object containing restaurant id & dish id
 * @param {Object} res - Object of restaurant data after deleted dish from menu
 *
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
      return res.status(404).json({ error: "Dish not found in menu" });
    }
    restaurant.menu.splice(dishIndex, 1);
    await restaurant.save();

    res.status(200).json({ message: "Dish deleted successfully", restaurant });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route POST /restaurants/:restaurantId/reviews
 * @param {Object} req - Object containing restaurant id in params
 * @param {Object} res - Object containing restaurant data with new review added
 *
 */

const addRestaurantRatingAndReviews = async (req, res) => {
  try {
    const { userId, rating, reviewText } = req.body;
    const restaurantId = req.params.restaurantId;
    const reviewData = {
      userId,
      rating,
      text: reviewText,
    };

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    restaurant.reviews.push(reviewData);

    const averageRating = restaurant.reviews.reduce(
      (acc, curr) => (acc = acc + curr.rating),
      0
    );

    restaurant.averageRating = averageRating / restaurant.reviews.length;
    await restaurant.save();

    res.status(200).json({
      message: "Review added succesfully",
      restaurant: restaurant,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * @rotue GET /restaurants/:restaurantId/reviews
 * @param {Object} req - Object containing restaurant id
 * @param {Object} res - Object containing array of reviews
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
      res.status(404).json({ error: "Restaurant not found" });
    }
    const reviews = restaurant.reviews;

    res.status(200).json({ reviews: reviews });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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
