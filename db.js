// Connect to MongoDB
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  
  try {
    await mongoose.connect(process.env.MongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ Connected to MongoDB database");
  } catch (error) {
  console.error("❌ Error connecting to MongoDB:");
  }
  
};

module.exports = connectDB;
