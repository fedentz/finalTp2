import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    images: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Product",
  }
);

export default Product;
