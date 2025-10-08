import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) return <h2>Your cart is empty.</h2>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id} style={{ marginBottom: "1rem" }}>
            <strong>{item.name}</strong> - ${item.price}
            <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: "1rem" }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default CartPage;
