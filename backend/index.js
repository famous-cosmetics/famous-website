const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);





require("dotenv").config();
const express = require('express');
const app = express();
// const port =  3000;
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const ProductRoutes = require('./routes/ProductRoutes')
const PartyRoutes = require('./routes/PartyRoutes')
const cors = require("cors")
const MongoDB = require('./config/mongo');
const mongoose = require("mongoose")
// Body parser middleware (POST রিকোয়েস্টের JSON ডাটা রিড করার জন্য)
app.use(express.json());


app.use(
    cors({
        origin: "*",
    })
);

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));









app.get("/", (req, res) => {
    res.send({
        messege: "Hellow your express js server is working now"
    })
})



app.use("/", ProductRoutes)
app.use("/", userRoutes)
app.use("/", PartyRoutes)










console.time("MongoDB Connection");

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.timeEnd("MongoDB Connection");
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error("MongoDB Error:", err);
    });









// সার্ভার চালু করা
const ConnectDB = require('./config/mongo')
    ;

const startServer = async () => {
    try {
        // await ConnectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Server stopped: MongoDB connection failed");
        process.exit(1);
    }
};

startServer();