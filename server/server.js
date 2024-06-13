require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./model/db');
const router = require('./router/auth-router');
const cors = require("cors");
const errorMiddleware = require("./middlewares/error-middleware")

const corsOptions = {
    origin: "http://localhost:5173",
    method: "POST, GET, PUT, PATCH, DELETE, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));

app.use(express.json());
app.use("/uploads",express.static("uploads"));
//app.use(express.urlencoded({extended: false}))

app.use("/api/auth",router);

app.use(errorMiddleware);








connectDB().then(()=>{
    const PORT = 5000;
    app.listen(PORT, ()=>{
    console.log(`Server is running at Port: ${PORT}`);
    });
})
