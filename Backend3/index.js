import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import contactRouter from "./routes/contact.route.js";
import stripeRouter from "./routes/payment.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

connectDb();

import { stripeWebhook } from "./controllers/stripe.controller.js";
app.post("/api/payment/webhook", express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()) || [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", contactRouter);
app.use("/api/payment", stripeRouter)

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

app.listen(port, () => {
});
