import connectDB from "../config/db.js";
import Cors from "cors";
import initMiddleware from "../utils/initMiddleware.js";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const cors = initMiddleware(
  Cors({ methods: ["GET", "POST", "DELETE"], origin: "*" })
);

connectDB();

export default async function handler(req, res) {
  await cors(req, res);

  try {
    const user = await verifyToken(req);

    if (req.method === "GET") await getCart(req, res, user);
    else if (req.method === "POST") await addToCart(req, res, user);
    else if (req.method === "DELETE") await removeFromCart(req, res, user);
    else res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
