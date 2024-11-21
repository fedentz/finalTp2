import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import User from "./User.js";

class Cart extends Model {}

Cart.init(
  {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
    totalPrice: {
      type: DataTypes.FLOAT, 
      allowNull: false,
      defaultValue: 0,
    }
  },
  {
    sequelize: connection,
    modelName: "Cart",
  }
);

export default Cart;
