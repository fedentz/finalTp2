import { Router } from "express";
import CartController from "../controllers/cartController.js";
import { validateLogin } from "../midlewares/validateLogin.js";

const cartRoutes = Router();

cartRoutes.use(validateLogin);
cartRoutes.get("/", CartController.getCart);
cartRoutes.post("/add", CartController.addProductToCart); 
cartRoutes.put("/update", CartController.updateProductQuantity);
cartRoutes.delete("/remove/:productId", CartController.removeProductFromCart); 
cartRoutes.delete("/clear", CartController.clearCart); 

export default cartRoutes;
