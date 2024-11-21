import ProductService from "../services/productService.js";

const ProductController = {
  async createProduct(req, res) {
    try {
      const {price, name, description} = req.body; 
      if (!price ||!name ||!description){
        throw new Error ("Los campos no pueden estar vaicos")
      } 
      if (price <= 1){
        throw new Error ("Precio Invalido")
      }
      const newProduct = await ProductService.createProduct({price, name, description});
      res.status(200).send(newProduct);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      res.status(200).send(product);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const {price, name, description} = req.body; 
      if (!price ||!name ||!description){
        throw new Error ("Los campos no pueden estar vaicos")
      } 
      if (price <= 1){
        throw new Error ("Precio Invalido")
      }
      const updatedProduct = await ProductService.updateProduct(id, {price, name, description});
      res.status(200).send(updatedProduct);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductService.deleteProduct(id);
      res.status(200).send(result);
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

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};


export default ProductController;
