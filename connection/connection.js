import { Sequelize } from "sequelize";
import { DB_NAME,
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_DIALECT,
    DB_PORT} from "../config/config.js"

// aca se pone la url al servicio si esta deployada y se usa variable de entorno (.env)
const connection = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port:DB_PORT
});

try{
    await connection.authenticate()
console.log("la conexion a la db se establecio exitosamente")
} catch(error){
    console.log("no se pudo establecer la conexion a la db", error)
}


export default connection;
