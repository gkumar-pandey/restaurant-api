const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  cuisine: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  menu: [
    {
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      description: {
        type: String,
      },
      isVeg: {
        type: String,
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
      },
      text: {
        type: String,
      },
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
