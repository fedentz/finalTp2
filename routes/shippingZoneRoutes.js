import { Router } from "express";
import ShippingController from "../controllers/shippingZoneController.js";
import { isAdmin } from "../midlewares/isAdmin.js";
import { validateLogin } from "../midlewares/validateLogin.js";

const shippingRoutes = Router();

shippingRoutes.post("/calculate", ShippingController.calculate);

shippingRoutes.get("/zones", validateLogin, isAdmin, ShippingController.getAllZones);
shippingRoutes.post("/create", validateLogin, isAdmin, ShippingController.createZone);
shippingRoutes.put("/:id/updatezone", validateLogin, isAdmin, ShippingController.updateZone);
shippingRoutes.delete("/:id/delete", validateLogin, isAdmin, ShippingController.deleteZone);

export default shippingRoutes;