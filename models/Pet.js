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
        defaultValue: 0,  
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
    },
    {
      sequelize: connection,
      modelName: "Pet",
    }
);
export default Pet