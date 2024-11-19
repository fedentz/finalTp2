import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class ShippingZone extends Model {}

ShippingZone.init(
  {
    zoneName: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    motoPrice: { 
      type: DataTypes.FLOAT, 
      allowNull: false 
    },
    autoPrice: { 
      type: DataTypes.FLOAT, 
      allowNull: false 
    },
  },
  {
    sequelize: connection,
    modelName: "ShippingZone",
  }
);

export default ShippingZone;