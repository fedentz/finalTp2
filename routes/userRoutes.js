import {Router} from "express"  
import UserController from "../controllers/UserController.js"
import { validateLogin } from "../midlewares/validateLogin.js"

const userRoutes = Router()
const userController = new UserController()

userRoutes.post("/create", userController.createUser) 
userRoutes.post("/login", userController.login)


userRoutes.use(validateLogin)
userRoutes.get("/me", userController.getMe)
userRoutes.get("/", userController.getAllUsers)
userRoutes.get("/:id", userController.getUserById)
userRoutes.put("/:id", userController.updateUser)
userRoutes.delete("/delete/:id", userController.deleteUser)
userRoutes.post("/logout", userController.logout)


export default userRoutes