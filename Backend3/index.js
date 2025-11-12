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

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

//  Connect to Database
connectDb();

//  Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS Setup — dynamically reads allowed origins from .env
const allowedOrigins = process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests from known origins or no-origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn(`❌ Blocked by CORS: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

//  API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

//  Health Check Route (optional but helpful in production)
app.get("/", (req, res) => {
  res.send(" Server is running successfully!");
});

//  Start Server
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port} (${process.env.NODE_ENV})`);
});
