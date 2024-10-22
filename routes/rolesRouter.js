import {Router} from "express"  

const rolesRoutes = Router()

rolesRoutes.get("/", (req, res) => {
    res.send("res desde roles routes")
})

export default rolesRoutes