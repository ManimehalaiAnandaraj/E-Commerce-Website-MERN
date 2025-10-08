const Cart = require("../models/Cart");

// GET all cart items for a user
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const cartItems = await Cart.find({ userId }).populate("productId");
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD product to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId)
      return res.status(400).json({ message: "User ID and Product ID are required" });

    const cartItem = new Cart({ userId, productId });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Cart item ID is required" });

    await Cart.findByIdAndDelete(id);
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
