import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodroute.js";
import userRouter from "./routes/userroute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartroute.js";
import orderRouter from "./routes/orderroute.js";

// ─── Environment variable validation ────────────────────────────────────────
const REQUIRED_ENV = ["MONGO_URI", "JWT_SECRET", "STRIPE_SECRET_KEY"];
const missing = REQUIRED_ENV.filter(k => !process.env[k]);
if (missing.length > 0) {
  console.error(`❌ Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

// ─── App config ─────────────────────────────────────────────────────────────
const app = express();
const port = process.env.PORT || 4000;

// ─── Security middleware ─────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

// Rate limiter for auth routes — max 20 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── General middleware ──────────────────────────────────────────────────────
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Food Fiesta API running ✅")
});

// ─── DB connection ───────────────────────────────────────────────────────────
connectDB();

// ─── API endpoints ───────────────────────────────────────────────────────────
app.use("/api/food",  foodRouter);
app.use("/Images",   express.static("uploads"));
app.use("/api/user", authLimiter, userRouter);   // rate-limited
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ─── Start server ────────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(` server started on http://localhost:${port}`);
});
