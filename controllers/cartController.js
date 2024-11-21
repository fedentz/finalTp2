import CartService from "../services/cartService.js";

const CartController = {
  async getCart(req, res) {
    try {
      const userId = req.user.id;
      const cart = await CartService.getCart(userId);
      res.status(200).send(cart);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async addProductToCart(req, res) {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            throw new Error("Los campos no pueden estar vacíos");
        }
        if (quantity <= 0) {
            throw new Error("Cantidad inválida");
        }
        const userId = req.user.id;

        const cart = await CartService.addProductToCart(userId, productId, quantity);
        res.status(200).send({ success: true, cart });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
},

  async updateProductQuantity(req, res) {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
      const updatedCart = await CartService.updateProductQuantity(userId, productId, quantity);
      res.status(200).send(updatedCart);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async removeProductFromCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const updatedCart = await CartService.removeProductFromCart(userId, productId);
      res.status(200).send(updatedCart);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async clearCart(req, res) {
    try {
      const userId = req.user.id;
      const clearedCart = await CartService.clearCart(userId);
      res.status(200).send(clearedCart);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
};

export default CartController;
