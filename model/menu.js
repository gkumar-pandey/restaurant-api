const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  isVeg: {
    type: Boolean,
    require: true,
    default: false,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
