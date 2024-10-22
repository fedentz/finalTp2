import { Sequelize } from "sequelize";

const connection = new Sequelize('tp2Tp', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    port:3306
});

try{
    await connection.authenticate()
console.log("la conexion a la db se establecio exitosamente")
} catch(error){
    console.log("no se pudo establecer la conexion a ka db", error)
}


export default connection;
