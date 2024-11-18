import ProductService from "../services/productService.js";

const ProductController = {
  async createProduct(req, res) {
    try {
      const productData = req.body;
      const newProduct = await ProductService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedProduct = await ProductService.updateProduct(id, updateData);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductService.deleteProduct(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default ProductController;
