import { Router } from "express";
import ProductController from "../controllers/productController.js";
import { validateLogin } from "../midlewares/validateLogin.js";
import { isAdmin } from "../midlewares/isAdmin.js";

const productRoutes = Router();

productRoutes.get("/", validateLogin, ProductController.getAllProducts);
productRoutes.get("/:id", validateLogin, ProductController.getProductById);

productRoutes.use(validateLogin)
productRoutes.use(isAdmin)
productRoutes.post("/create", validateLogin, isAdmin, ProductController.createProduct);
productRoutes.put("/:id", validateLogin, isAdmin, ProductController.updateProduct);
productRoutes.delete("/:id", validateLogin, isAdmin, ProductController.deleteProduct);

export default productRoutes;
