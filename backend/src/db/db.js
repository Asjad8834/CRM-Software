
const mongoose = require("mongoose");

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected")
    
  }catch(error){
    console.log("Error occured", error);
  }
}

module.exports = connectDB;