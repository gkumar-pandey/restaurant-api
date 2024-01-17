const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const restaurantRoute = require("./routes/restaurant");
const { connectDb } = require("./db/db");
const { userRoutes } = require("./routes/user");
const pageNotFoundErrorHandler = require("./middleware/PageNotFound.middleware");
const ErrorHandler = require("./middleware/ErrorHandler.middleware");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

dotenv.config();
connectDb(); // database connection

app.get("/", (req, res) => {
  res.json("Hello express");
});
// Restaurants Routes
app.use("/restaurants", restaurantRoute);

// Users Routes
app.use("/users", userRoutes);

// 404 Error handler
app.use(pageNotFoundErrorHandler);

// global error handler
app.use(ErrorHandler);

app.listen(5000, () => {
  console.log("Server is running at port:5000");
});
