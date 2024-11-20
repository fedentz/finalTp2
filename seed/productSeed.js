import Product from "../models/Product.js";

const productSeed = async () => {
  const products = [
    {
      name: "Product 1",
      description: "Description of product 1",
      price: 100.0,
      stock: 50,
      images: null,
    },
    {
      name: "Product 2",
      description: "Description of product 2",
      price: 200.0,
      stock: 30,
      images: null,
    },
    {
      name: "Product 3",
      description: "Description of product 3",
      price: 300.0,
      stock: 20,
      images: null,
    },
    {
      name: "Product 4",
      description: "Description of product 4",
      price: 400.0,
      stock: 15,
      images: null,
    },
    {
      name: "Product 5",
      description: "Description of product 5",
      price: 500.0,
      stock: 10,
      images: null,
    },
  ];

  try {
    await Product.bulkCreate(products);
    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};

export default productSeed;
