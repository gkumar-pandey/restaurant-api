const Restaurant = require("../model/restaurant");

const createRestaurant = async (req, res) => {
  try {
    const restaurant = req.body;
    const newRestaurant = new Restaurant(restaurant);
    const savedRestaurant = await newRestaurant.save();
    if (!savedRestaurant) {
      res.status(500).json({ error: "Restaurant not saved!" });
    }
    res.status(201).json({ data: { restaurants: savedRestaurant } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

const readRestaurantsHandler = async (req, res) => {
  try {
    const name = req.params.name;
    const foundRestaurant = await Restaurant.find({ name: name });
    if (foundRestaurant) {
      res.status(200).json({ data: { restaurant: foundRestaurant } });
    } else {
      res.status(404).json({ error: "Restaurant not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

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

// delete restaurant
const deleteRestaurantHandler = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!deletedRestaurant) {
      res.status(404).json({ error: "Restaurant not found" });
    }

    res
      .status(204)
      .json({ message: "Deleted seccessfull", restaurant: deletedRestaurant });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

const searchRestaurantsByLocation = async (req, res) => {
  console.log("Hello world");
  try {
    // const { location } = req.query;

    // const restaurants = await Restaurant.find({ city: location });
    // res.json(restaurants);
    console.log("hello world");
  } catch (error) {
    res.json(500).json({ error: "Internal server error" });
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
  searchRestaurantsByLocation,
};
