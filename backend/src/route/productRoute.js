import { Router } from "express";
import Product from "../schema/productSchema.js";
import { isLoggedIn, isAdmin } from "../middleware/auth.js";

let productRoute = Router();

productRoute
    .route("/") //localhost:8000/product
    .post(isLoggedIn, isAdmin, async (req, res, next) => {
        try {
            let result = await Product.create(req.body);
            res.status(200).json({
                success: true,
                message: "product created successfully",
                result: result,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    })
    .get(async (req, res, next) => {
        // get all data from product
        try {
            let result = await Product.find();
            res.status(200).json({
                success: true,
                message: "product read successfully",
                result: result,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    });

productRoute
    .route("/:id") //localhost:8000/product/:id
    .get(async (req, res, next) => {
        try {
            let result = await Product.findById(req.params.id);
            res.status(200).json({
                success: true,
                message: "product read successfully",
                result: result,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    })
    .patch(isLoggedIn, isAdmin, async (req, res, next) => {
        try {
            let result = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true, //shows up new data otherwise shows old data
            });
            res.status(200).json({
                success: true,
                message: "product updated successfully",
                result: result,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    })
    .delete(isLoggedIn, isAdmin, async (req, res, next) => {
        try {
            let result = await Product.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                message: "product deleted successfully",
                result: result,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    });

export default productRoute;