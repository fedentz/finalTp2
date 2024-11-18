import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Pet extends Model {}
Pet.init(
{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING, 
      },
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    },
    {
      sequelize: connection,
      modelName: "Pet",
    }
);
export default Pet