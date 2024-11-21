import { Router } from "express";
import ShippingController from "../controllers/shippingZoneController.js";
import { isAdmin } from "../midlewares/isAdmin.js";
import { validateLogin } from "../midlewares/validateLogin.js";

const shippingRoutes = Router();


shippingRoutes.post("/calculate", ShippingController.calculate);

shippingRoutes.use(validateLogin)
shippingRoutes.use(isAdmin)
shippingRoutes.get("/zones", ShippingController.getAllZones);
shippingRoutes.post("/create", ShippingController.createZone);
shippingRoutes.put("/:id/updatezone", ShippingController.updateZone);
shippingRoutes.delete("/:id/delete", ShippingController.deleteZone);


export default shippingRoutes;
