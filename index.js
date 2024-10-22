//lo mas limpio posible y que de aca nos redireccione a las distintas areas de la app
import express from "express"
import router from "./routes/router.js"

const app = express() //ejecutado express, creado el servidor

app.use(router) //usa rutas

app.listen(8000, ()=> {
    console.log("app listening on port 8000");
})