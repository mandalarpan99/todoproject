const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/todoDB";

const connectDB = async ()=>{
    try {
        await mongoose.connect(URI)
        console.log("Database connections successful");
    } catch (error) {
        console.log(error);
        console.log("Database connections unsuccessful");
        process.exit(0);
    }
}


module.exports = connectDB;