import express from "express"
import router from "./routes/router.js"
import morgan from "morgan"
import { SERVER_PORT } from "./config/config.js"
import allSeeds from "./seed/allSeeds.js"
import cookieParser from "cookie-parser"

const app = express() 

app.use(express.urlencoded({extended:false})) 
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser())

app.use("/app",router) 

//await allSeeds()

app.listen(SERVER_PORT, ()=> {
    console.log("app listening on port 8000")
})