import connectDB from "../config/db.js";
import Cors from "cors";
import initMiddleware from "../utils/initMiddleware.js";
import { loginUser, registerUser } from "../controllers/authController.js";

const cors = initMiddleware(
  Cors({ methods: ["POST"], origin: "*" })
);

connectDB();

export default async function handler(req, res) {
  await cors(req, res);
  try {
    if (req.method === "POST") {
      if (req.url.includes("login")) await loginUser(req, res);
      else if (req.url.includes("register")) await registerUser(req, res);
      else res.status(400).json({ message: "Invalid endpoint" });
    } else res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
