import CartService from "../services/cartService.js";
import Cart from "../models/cart.js"
import Product from "../models/Product.js"
import CartItem from "../models/CartItem.js";

const CartController = {
  async getCart(req, res) {
    try {
      const userId = req.user.id;
      const cart = await CartService.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async addProductToCart(req, res) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id;
  
      // Obtener o crear un carrito activo
      let cart = await Cart.findOne({ where: { userId, status: "active" } });
      if (!cart) {
        cart = await Cart.create({ userId, status: "active" });
      }
  
      // Verificar si el producto ya está en el carrito
      const cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId },
      });

      console.log("Cart controller - addProductToCart - productID:", productId)
      console.log("Cart controller - addProductToCart - quantity:", quantity)
      if (cartItem) {
        // Actualizar la cantidad si el producto ya está en el carrito
        const newQuantity = cartItem.quantity + parseInt(quantity, 10);
        await cartItem.update({ quantity: newQuantity });
      } else {
        // Crear un nuevo CartItem si no existe
        const product = await Product.findByPk(productId);
        if (!product) throw new Error("Product not found");
        if (product.stock < quantity) throw new Error("Insufficient stock");
  
        await CartItem.create({
          cartId: cart.id,
          productId,
          quantity,
          price: product.price,
        });
      }
  
      // Recalcular el total del carrito
      const totals = await CartService.calculateCartTotal(cart.id);
  
      res.status(200).json({ success: true, cart: totals });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateProductQuantity(req, res) {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
      const updatedCart = await CartService.updateProductQuantity(userId, productId, quantity);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async removeProductFromCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const updatedCart = await CartService.removeProductFromCart(userId, productId);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async clearCart(req, res) {
    try {
      const userId = req.user.id;
      const clearedCart = await CartService.clearCart(userId);
      res.status(200).json(clearedCart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default CartController;
