import { Router } from "express";
import ShippingController from "../controllers/shippingZoneController.js";
import { isAdmin } from "../midlewares/isAdmin.js";
import { validateLogin } from "../midlewares/validateLogin.js";

const shippingRoutes = Router();


shippingRoutes.post("/calculate", ShippingController.calculate);

shippingRoutes.use(validateLogin)
shippingRoutes.use(isAdmin)
shippingRoutes.get("/zones", ShippingController.getAllZones);
shippingRoutes.post("/zones", ShippingController.createZone);
shippingRoutes.put("/zones/:id", ShippingController.updateZone);
shippingRoutes.delete("/zones/:id", ShippingController.deleteZone);
shippingRoutes.put("/zones/increase-prices", ShippingController.increasePrices);


export default shippingRoutes;
