import Cart from "../models/cart.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import sequelize from "../connection/connection.js"; 


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
    try {
      const cart = await this.getCart(userId);
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
  
      if (product.stock < quantity) {
        throw new Error("Stock insuficiente");
      }
  
      const cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId },
      });
  
      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        await CartItem.create({
          cartId: cart.id,
          productId,
          quantity,
          price: product.price,
        });
      }
  
      product.stock -= quantity;
      await product.save();
  
      const updatedCart = await this.calculateCartTotal(cart.id);
  
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }
  ,

  async updateProductQuantity(userId, productId, quantity) {
    const cart = await this.getCart(userId);

    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!cartItem) {
      throw new Error("No se encontró el producto en el carrito");
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("No se encontró el producto");
    }

    const difference = quantity - cartItem.quantity;
    if (product.stock < difference) {
      throw new Error("No hay suficiente stock disponible");
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    product.stock -= difference;
    await product.save();

    return this.getCart(userId);
  },

  async removeProductFromCart(userId, productId) {
    const cart = await this.getCart(userId);

    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      const product = await Product.findByPk(productId);
      if (product) {
        product.stock += cartItem.quantity;
        await product.save();
      }

      await cartItem.destroy();
    }

    return this.getCart(userId);
  },

  async clearCart(userId) {
    const cart = await this.getCart(userId);

    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    await CartItem.destroy({ where: { cartId: cart.id } });
    return this.getCart(userId);
  },

  async calculateCartTotal(cartId) {
    const cart = await Cart.findByPk(cartId, {
      include: {
        model: CartItem,
        include: {
          model: Product,
          attributes: ["id", "name", "price"],
        },
      },
    });

    if (!cart) throw new Error("Cart not found");

    const groupedItems = cart.CartItems.reduce((acc, item) => {
      const existing = acc.find((i) => i.productId === item.productId);
      if (existing) {
        existing.quantity += item.quantity;
        existing.total += item.quantity * item.Product.price;
      } else {
        acc.push({
          productId: item.productId,
          name: item.Product.name,
          price: item.Product.price,
          quantity: item.quantity,
          total: item.quantity * item.Product.price,
        });
      }
      return acc;
    }, []);

    const subtotal = groupedItems.reduce((sum, item) => sum + item.total, 0);
    const discount = cart.discount || 0;
    const totalPrice = subtotal - discount;
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
