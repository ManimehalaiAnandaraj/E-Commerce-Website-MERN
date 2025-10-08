const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Get cart items
router.get("/", cartController.getCart);

// Add item to cart
router.post("/", cartController.addToCart);

// Remove item from cart
router.delete("/:id", cartController.removeFromCart);

module.exports = router;
