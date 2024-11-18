import {Router} from "express"  
import PetController from "../controllers/petController.js"
import { validateLogin } from "../midlewares/validateLogin.js"
import uploadMw from "../midlewares/uploadMw.js"
import { extractUserId } from "../midlewares/extractUserId.js"


const petRoutes = Router()

petRoutes.get("/", (req, res) => {res.send("res desde pet routes")})

petRoutes.use(validateLogin)
petRoutes.post("/addpet", extractUserId, uploadMw.single("photo"), PetController.addPet);
petRoutes.get("/mypets", extractUserId, PetController.getMyPets);
petRoutes.get("/:id", extractUserId, PetController.getPet);
petRoutes.put("/updatepet/:id", extractUserId, uploadMw.single("photo"), PetController.updatePet);
petRoutes.delete("/deletepet/:id", extractUserId, PetController.deletePet);


export default petRoutes