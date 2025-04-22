import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food.route.js";
import userRouter from "./routes/user.routes.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
dotenv.config();

// app config
const app = express();
const port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB(process.env.DB_URL);

// API endpoints
app.use("/api/v1/food", foodRouter);
app.use("/images", express.static("./uploads"));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API is Working!");
});

app.listen(port, () => {
  console.log(`🛞 Server is running on: http://localhost:${port}`);
});
