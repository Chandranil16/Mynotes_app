const mongoose = require("mongoose");
require("dotenv").config();
const mongodbconnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    }catch(error){
        console.error("MongoDB connection failed:", error.message);
    }
}

module.exports= mongodbconnect;