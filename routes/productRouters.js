import { Router } from "express";
import ProductController from "../controllers/productController.js";
import { validateLogin } from "../midlewares/validateLogin.js";
import { isAdmin } from "../midlewares/isAdmin.js";


const productRoutes = Router();

productRoutes.get("/", ProductController.getAllProducts);
productRoutes.get("/:id", ProductController.getProductById);

productRoutes.use(validateLogin)
productRoutes.use(isAdmin)
productRoutes.post("/create", ProductController.createProduct);
productRoutes.put("/:id", validateLogin, isAdmin, ProductController.updateProduct);
productRoutes.delete("/:id", ProductController.deleteProduct);
productRoutes.put("/:id/adjust-stock", ProductController.adjustStock);


export default productRoutes;
