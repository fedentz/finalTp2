import express from "express"
import router from "./routes/router.js"

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/app",router);

app.listen(8000, ()=> {
    console.log("server on port 8000");
})