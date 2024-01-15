const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./db/db");

const restaurantRoute = require("./routes/restaurant");

dotenv.config();

const app = express();
app.use(express.json());
connectDb();

const restaurantData = {
  name: "Delicious Bites",
  cuisine: "Italian",
  address: "123 Main Street",
  city: "Foodville",
  rating: 4.5,
  menu: [
    {
      name: "Margherita Pizza",
      price: 12.99,
      description: "Classic pizza with tomato, mozzarella, and basil",
      isVeg: false,
      averageRating: 4.8,
    },
    {
      name: "Spaghetti Bolognese",
      price: 15.99,
      description: "Spaghetti with meat sauce and Parmesan cheese",
      isVeg: true,
      averageRating: 4.5,
    },
    {
      name: "Tiramisu",
      price: 7.99,
      description: "Classic Italian dessert with coffee and mascarpone",
      isVeg: false,
      averageRating: 4.2,
    },
  ],
};
app.get("/", (req, res) => {
  res.json("Hello express");
});
app.use("/restaurants", restaurantRoute);

app.use((req, res) => {
  res.json({ error: "Route not found" });
});

app.listen(5000, () => {
  console.log("Server is running at port:5000");
});
