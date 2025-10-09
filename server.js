import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// ✅ Body parser
app.use(express.json());

// ✅ CORS setup
const allowedOrigins = [
  "https://e-commerce-website-mern-q97vrspgt-manimehalais-projects.vercel.app", // your deployed frontend
  "https://e-commerce-website-mern-chi.vercel.app" // optional alternate domain
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
