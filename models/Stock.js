import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Stock extends Model {}

Stock.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      references: { model: "Products", key: "id" },
      allowNull: false,
    },
    adjustment: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Stock",
  }
);

export default Stock;
