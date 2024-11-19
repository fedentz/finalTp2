import {Router} from "express"  //para no llamar a todo el paquete de express, solo este modulo
import userRoutes from "./userRoutes.js";
import rolesRoutes from "./rolesRouter.js"
import petRoutes from "./petRoutes.js";
import productRoutes from "./productRouters.js";
import stockRoutes from "./stockRoutes.js";
import cartRoutes from "./cartRoutes.js"
import shippingRoutes from "./shippingZoneRoutes.js";

const router = Router()

router.use("/user",userRoutes)
router.use("/roles",rolesRoutes)
router.use("/pets",petRoutes)
router.use("/product",productRoutes)
router.use("/stock",stockRoutes)
router.use("/cart",cartRoutes)
router.use("/shipping",shippingRoutes)

export default router;

