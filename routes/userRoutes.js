import {Router} from "express"  
import UserController from "../controllers/userController.js"

const userRoutes = Router()

const userController = new UserController()

userRoutes.get("/", userController.getAllUsers)
userRoutes.get("/:id", userController.getUserById)
userRoutes.post("/create", userController.createUser)
userRoutes.put("/:id", userController.updateUser)
userRoutes.delete("/delete/:id", userController.deleteUser)


export default userRoutes