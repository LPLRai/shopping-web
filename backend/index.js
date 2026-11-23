import mongoose from "mongoose";
import express, { json } from "express";
import cors from "cors";
import productRoute from "./src/route/productRoute.js";
import userRoute from "./src/route/userRoute.js";
import orderRoute from "./src/route/orderRoute.js";

await mongoose.connect("mongodb://127.0.0.1:27017/shoppingweb");
console.log("Connected to MongoDB");

let app = express(); /* make backend application */

app.listen(8000, () => { /* attach 8000 port to application. */
    console.log("Application is running at port 8000")
});
app.use(cors()); /* lets React talk to this backend */
app.use(json());

app.use("/product", productRoute); /* localhost:8000/product */
app.use("/user", userRoute); /* localhost:8000/user */
app.use("/order", orderRoute); /* localhost:8000/order */