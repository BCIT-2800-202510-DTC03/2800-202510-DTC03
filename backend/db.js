const mongoose = require("mongoose");
require("dotenv").config();

async function connectToMongo() {

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      /* URI stands for Uniform Resourcer Identifier. Here it's our db connection */
      dbName: "BloomGreenerDB",
    });
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Connection to MongoDB failed. Error: ", err);
  }
}

module.exports = connectToMongo;


