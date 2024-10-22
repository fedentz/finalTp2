import {Router} from "express"  //para no llamar a todo el paquete de express, solo este modulo
import userRoutes from "./userRoutes.js";
import rolesRoutes from "./rolesRouter.js"

const router = Router()

router.use("/user",userRoutes)

router.use("/roles", rolesRoutes)


export default router;

