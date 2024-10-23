import { HasOne } from "sequelize";
import Role from "./Role.js";
import User from "./User.js";

//aca se crean las relaciones entre tablas
// hasOne 1a1 ; belongs to ; hasMany 1aM ; belongs to many

Role.hasMany(User)
User.belongsTo(Role)

export {Role, User}


//En phpMyAdmin se puede ver la relacion de las tablas diagramada (mas -> diseniador)