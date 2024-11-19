import { HasOne } from "sequelize";
import Role from "./Role.js";
import User from "./User.js";
import Pet from "./Pet.js"
import Product from "./Product.js";
import Stock from "./Stock.js";
import Cart from "./cart.js"
import CartItem from "./CartItem.js"

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Pet, { foreignKey: "userId" });
Pet.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Stock, { foreignKey: "productId" });
Stock.belongsTo(Product, { foreignKey: "productId" });

User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });


export {
    Role,
    User,
    Pet,
    Product,
    Stock,
    Cart,
    CartItem
}

