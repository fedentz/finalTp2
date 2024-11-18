import express from "express"
import router from "./routes/router.js"
import morgan from "morgan"
import connection from "./connection/connection.js"
import { SERVER_PORT } from "./config/config.js"
import roleSeed from "./seed/roleSeed.js"
import cookieParser from "cookie-parser"

const app = express() 

app.use(express.urlencoded({extended:true})) 
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser())

app.use("/app",router) 

await connection.sync({force:false})
//await roleSeed()

app.listen(SERVER_PORT, ()=> {
    console.log("app listening on port 8000")
})