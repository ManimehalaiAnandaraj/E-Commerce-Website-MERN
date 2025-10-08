const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const seedProducts = async () => {
  try {
    await Product.deleteMany(); // clear old data
    await Product.insertMany([
      { name: "Laptop", price: 75000, description: "Powerful 15-inch laptop" },
      { name: "Smartphone", price: 30000, description: "Latest Android model" },
      { name: "Headphones", price: 2500, description: "Noise cancelling" },
      { name: "Smartwatch", price: 8000, description: "Fitness and notifications" },
    ]);
    console.log("✅ Products seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedProducts();
