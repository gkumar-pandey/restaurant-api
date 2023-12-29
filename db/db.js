const mongoose = require("mongoose");

const connectDb = async () => {
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;

  const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@restaurant.pt2wcp1.mongodb.net/?retryWrites=true&w=majority`;
  try {
    const connect = await mongoose.connect(dbURL);
    console.log("Database connected successfully...");
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

module.exports = connectDb;
