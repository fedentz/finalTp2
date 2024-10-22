import {Router} from "express"  
import UserController from "../controllers/UserController.js"

const userRoutes = Router()

const userController = new UserController()

userRoutes.get("/", userController.getAllUsers)


export default userRoutes