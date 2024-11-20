import CartService from "../services/cartService.js";
import Cart from "../models/cart.js"
import Product from "../models/Product.js"
import CartItem from "../models/CartItem.js";

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
      const userId = req.user.id;
  
      let cart = await Cart.findOne({ where: { userId, status: "active" } });
      if (!cart) {
        cart = await Cart.create({ userId, status: "active" });
      }
  
      const cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId },
      });

      if (cartItem) {
        const newQuantity = cartItem.quantity + parseInt(quantity, 10);
        await cartItem.update({ quantity: newQuantity });
      } else {
  
        const product = await Product.findByPk(productId);
        if (!product) throw new Error("Producto no encontrado");
        if (product.stock < quantity) throw new Error("No hay Stock suficiente de este producto");
  
        await CartItem.create({
          cartId: cart.id,
          productId,
          quantity,
          price: product.price,
        });
      }
  
      const totals = await CartService.calculateCartTotal(cart.id);
  
      res.status(200).send({ success: true, cart: totals });
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
