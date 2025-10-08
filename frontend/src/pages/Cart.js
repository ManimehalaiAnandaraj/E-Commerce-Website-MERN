import React from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {cart.map((item) => (
              <div key={item._id} style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
