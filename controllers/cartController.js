import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("products.product");
    res.json(cart || { products: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addToCart = async (req, res) => {
  const { product, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, products: [] });

    const existing = cart.products.find((p) => p.product.toString() === product);
    if (existing) existing.quantity += quantity;
    else cart.products.push({ product, quantity });

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { product } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter((p) => p.product.toString() !== product);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
