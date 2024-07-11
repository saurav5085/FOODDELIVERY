import express from "express";
import cartController from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const { addToCart, removeFromCart, getCart } = cartController;

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.post("/remove",authMiddleware, removeFromCart);
cartRouter.post("/get",authMiddleware, getCart);

export default cartRouter;
