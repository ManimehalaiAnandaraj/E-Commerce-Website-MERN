import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2>Welcome, {user?.email}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
          {products.map((product) => (
            <div key={product._id} style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              {cart.some((item) => item._id === product._id) ? (
                <button onClick={() => removeFromCart(product._id)}>Remove from Cart</button>
              ) : (
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
