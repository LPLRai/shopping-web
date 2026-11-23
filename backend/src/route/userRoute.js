import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schema/userSchema.js";
import { SECRET } from "../secret.js";

let userRoute = Router();

userRoute
    .route("/register") // localhost:8000/user/register
    .post(async (req, res, next) => {
        try {
            let { name, email, password } = req.body;
            let firstUser = await User.findOne(); // is there any user already?
            let hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                name: name,
                email: email,
                password: hashedPassword,
                isAdmin: !firstUser, // true only for the very first user
            });
            res.status(200).json({
                success: true,
                message: "user registered successfully",
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    });

userRoute
    .route("/login") // localhost:8000/user/login
    .post(async (req, res, next) => {
        try {
            let { email, password } = req.body;
            let user = await User.findOne({ email: email });
            if (!user) throw new Error("Email or password is wrong");

            let isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Email or password is wrong");

            let token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                SECRET,
                { expiresIn: "7d" }
            );
            res.status(200).json({
                success: true,
                message: "login successful",
                token: token,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    });

export default userRoute;