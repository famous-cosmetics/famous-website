
const mongoose = require("mongoose");



const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Successfully Connected with MongoDB");
    } catch (error) {
        console.log("Connection failed at DB:", error.message);
    }
};

module.exports = ConnectDB;