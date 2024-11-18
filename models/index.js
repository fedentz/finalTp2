import { HasOne } from "sequelize";
import Role from "./Role.js";
import User from "./User.js";
import Pet from "./Pet.js"
import Product from "./Product.js";
import Stock from "./Stock.js";

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Pet)
Pet.belongsTo(User)

Product.hasMany(Stock, { foreignKey: "productId" });
Stock.belongsTo(Product, { foreignKey: "productId" });

export {
    Role,
    User,
    Pet,
    Product,
    Stock
}

