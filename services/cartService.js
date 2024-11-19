import Cart from "../models/cart.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

const CartService = {
  async getCart(userId) {
    let cart = await Cart.findOne({
      where: { userId, status: "active" },
      include: {
        model: CartItem,
        include: [Product],
      },
    });

    if (!cart) {
      cart = await Cart.create({ userId });
    }

    return cart;
  },

  async addProductToCart(userId, productId, quantity) {
    console.log("CartService - userId:", userId);
    console.log("CartService - productId:", productId);
    console.log("CartService - quantity:", quantity);

    const cart = await this.getCart(userId);

    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await CartItem.create({ cartId: cart.id, productId, quantity });
    }

    return this.getCart(userId);
  },

  async updateProductQuantity(userId, productId, quantity) {
    const cart = await this.getCart(userId);
    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!cartItem) {
      throw new Error("Product not found in cart");
    }

    if (quantity <= 0) {
      await cartItem.destroy();
    } else {
      cartItem.quantity = quantity;
      await cartItem.save();
    }

    return this.getCart(userId);
  },

  async removeProductFromCart(userId, productId) {
    const cart = await this.getCart(userId);
    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      await cartItem.destroy();
    }

    return this.getCart(userId);
  },

  async clearCart(userId) {
    const cart = await this.getCart(userId);
    await CartItem.destroy({ where: { cartId: cart.id } });
    return this.getCart(userId);
  },

  async calculateCartTotal(cartId) {
    const cart = await Cart.findByPk(cartId, {
      include: {
        model: CartItem,
        include: {
          model: Product,
          attributes: ["id", "name", "price", "category"],
        },
      },
    });

    if (!cart) throw new Error("Cart not found");

    // Agrupar productos por productId
    const groupedItems = cart.CartItems.reduce((acc, item) => {
      const existing = acc.find((i) => i.productId === item.productId);
      if (existing) {
        existing.quantity += item.quantity;
        existing.total += item.quantity * item.price;
      } else {
        acc.push({
          productId: item.productId,
          name: item.Product.name,
          price: item.price,
          quantity: item.quantity,
          total: item.quantity * item.price,
        });
      }
      return acc;
    }, []);

    // Calcular subtotal
    const subtotal = groupedItems.reduce((sum, item) => sum + item.total, 0);

    // Aplicar descuento (si existe)
    const discount = cart.discount || 0;
    const totalPrice = subtotal - discount;

    // Actualizar el total en el carrito
    await cart.update({ totalPrice });

    return {
      subtotal,
      totalPrice,
      discount,
      items: groupedItems,
    };
  },
};

export default CartService;
