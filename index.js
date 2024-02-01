const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const { connectDb } = require("./db/db");
const pageNotFoundErrorHandler = require("./middleware/PageNotFound.middleware");
const ErrorHandler = require("./middleware/ErrorHandler.middleware");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

dotenv.config();
connectDb(); // database connection

app.use("/", routes);

// 404 Error handler
app.use(pageNotFoundErrorHandler);

// global error handler
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});
