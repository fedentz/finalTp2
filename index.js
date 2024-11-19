import express from "express"
import router from "./routes/router.js"
import morgan from "morgan"
import connection from "./connection/connection.js"
import { SERVER_PORT } from "./config/config.js"
import roleSeed from "./seed/roleSeed.js"
import { seedShippingZones } from "./seed/shippingZoneSeed.js"
import petSeed from "./seed/petSeed.js"
import userSeed from "./seed/userSeed.js"
import productSeed from "./seed/productSeed.js"
import cookieParser from "cookie-parser"

const app = express() 

app.use(express.urlencoded({extended:false})) 
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser())

app.use("/app",router) 

//await connection.sync({force:false})
//await roleSeed()
// await userSeed()
//await seedShippingZones()
// await petSeed()
// await productSeed()

app.listen(SERVER_PORT, ()=> {
    console.log("app listening on port 8000")
})