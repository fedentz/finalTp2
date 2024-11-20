import {Router} from "express"  
import PetController from "../controllers/petController.js"
import { validateLogin } from "../midlewares/validateLogin.js"
import { extractUserId } from "../midlewares/extractUserId.js"


const petRoutes = Router()

petRoutes.use(validateLogin)
petRoutes.post("/addpet", extractUserId, PetController.addPet);
petRoutes.get("/mypets", extractUserId, PetController.getMyPets);
petRoutes.get("/:id", extractUserId, PetController.getPet);
petRoutes.put("/updatepet/:id", extractUserId, PetController.updatePet);
petRoutes.delete("/deletepet/:id", extractUserId, PetController.deletePet);


export default petRoutes