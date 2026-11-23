import jwt from "jsonwebtoken";
import { SECRET } from "../secret.js";

// checks that the person is logged in
export const isLoggedIn = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1]; // "Bearer <token>"
        req.user = jwt.verify(token, SECRET);
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Please login first",
        });
    }
};

// checks that the person is an admin
export const isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Admin only",
        });
    }
};