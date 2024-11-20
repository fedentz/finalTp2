import {Router} from "express"
import { validateLogin } from "../midlewares/validateLogin.js"
import { isAdmin } from "../midlewares/isAdmin.js"
const rolesRoutes = Router()

rolesRoutes.use(validateLogin)
rolesRoutes.use(isAdmin)
rolesRoutes.get("/", (req, res) => {
    res.send("res desde roles routes")
})

export default rolesRoutes  