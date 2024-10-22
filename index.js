//lo mas limpio posible y que de aca nos redireccione a las distintas areas de la app
import express from "express"
import router from "./routes/router.js"
import morgan from "morgan"
import connection from "./connection/connection.js"
import User from "./models/User.js"

const app = express() //ejecutado express, creado el servidor

//middlewares
//fundamentales
//core
app.use(express.urlencoded({extended:true})) //para req.body
app.use(express.json())
//el resto
// de terceros
//morgan mw -> npm morgan --> hace logs de requests
app.use(morgan('tiny'))

//rutas
app.use("/app",router) //usa rutas

// sync de db
await connection.sync()

// listen
app.listen(8000, ()=> {
    console.log("app listening on port 8000");
})