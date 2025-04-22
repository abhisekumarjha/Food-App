import express from "express";
import {
  addToCart,
  removeFromCart,
  getCartItem,
} from "../controllers/cart.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCartItem);

export default cartRouter;
