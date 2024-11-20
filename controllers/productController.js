import ProductService from "../services/productService.js";

const ProductController = {
  async createProduct(req, res) {
    try {
      const productData = req.body; //VALIDAR
      const newProduct = await ProductService.createProduct(productData);
      res.status(201).send(newProduct);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(201).send(products);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      res.status(201).send(product);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body; //VALIDAR
      const updatedProduct = await ProductService.updateProduct(id, updateData);
      res.status(201).send(updatedProduct);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductService.deleteProduct(id);
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async adjustStock(req, res) {
    try {
      const { id } = req.params; 
      const { adjustment, reason } = req.body;

      if (!adjustment || isNaN(adjustment)) {
        return res.status(400).send({ error: "El adjustment tiene que ser un numero" });
      }

      const result = await ProductService.adjustStock(id, parseInt(adjustment), reason);

      res.status(201).send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};


export default ProductController;
