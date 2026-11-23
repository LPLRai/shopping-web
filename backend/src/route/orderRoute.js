import { Router } from "express";
import Order from "../schema/orderSchema.js";
import Product from "../schema/productSchema.js";
import { isLoggedIn } from "../middleware/auth.js";

let orderRoute = Router();

orderRoute
    .route("/") // localhost:8000/order
    .post(isLoggedIn, async (req, res, next) => {
        try {
            // body: { items: [{ productId: "...", quantity: 2 }], address: "Kathmandu" }
            let { items, address } = req.body;
            let orderItems = [];
            let totalPrice = 0;

            for (let item of items) {
                let product = await Product.findById(item.productId);
                orderItems.push({
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity,
                });
                totalPrice = totalPrice + product.price * item.quantity;
            }

            let result = await Order.create({
                user: req.user.id,
                items: orderItems,
                totalPrice: totalPrice,
                address: address,
            });
            res.status(200).json({
                success: true,
                message: "order created successfully",
                result: result,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    });

orderRoute
    .route("/mine") // localhost:8000/order/mine
    .get(isLoggedIn, async (req, res, next) => {
        try {
            let result = await Order.find({ user: req.user.id });
            res.status(200).json({
                success: true,
                message: "orders read successfully",
                result: result,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    });

export default orderRoute;