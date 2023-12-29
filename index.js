const express = require("express");
const connectDb = require("./db/db");
const dotenv = require("dotenv");
dotenv.config();

connectDb();
