import { HasOne } from "sequelize";
import Role from "./Role.js";
import User from "./User.js";
import Pet from "./Pet.js"

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Pet)
Pet.belongsTo(User)

export {Role, User}

