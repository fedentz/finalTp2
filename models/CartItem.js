import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import Cart from "./cart.js";
import Product from "./Product.js";

class CartItem extends Model {}

CartItem.init(
  {
    cartId: {
      type: DataTypes.INTEGER,
      references: { model: Cart, key: "id" },
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: { model: Product, key: "id" },
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, 
    },
    price: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    }
  },
  {
    sequelize: connection,
    modelName: "CartItem",
  }
);

export default CartItem;
