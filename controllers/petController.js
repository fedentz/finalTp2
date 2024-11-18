import PetService from "../services/PetService.js";

const PetController = {
  async addPet(req, res) {
    try {
      const userId = req.userId;
      const { name, birthday, age } = req.body
      if (!name || !birthday) {
        return res.status(400).json({ error: "Name and birthday are required." });
      }
      const newPet = await PetService.addPet(userId, { name, birthday, age }, req.file);
      res.status(200).json(newPet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getPet(req, res) {
    try {
      const userId = req.userId; 
      const { id } = req.params; 
      const pet = await PetService.getPet(id, userId);
      res.status(200).json(pet); 
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async updatePet(req, res) {
    try {
      const userId = req.userId; 
      const { id } = req.params; 
      const { name, birthDay, age } = req.body; 

      const updatedPet = await PetService.updatePet(
        id,
        userId,
        { name, birthDay, age },
        req.file 
      );

      res.status(200).json(updatedPet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async deletePet(req, res) {
    try {
      const userId = req.userId; 
      const { id } = req.params; 

      const result = await PetService.deletePet(id, userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getMyPets(req, res) {
    try {
      const userId = req.userId; 

      const pets = await PetService.getMyPets(userId);
      res.status(200).json(pets); 
    } catch (error) {
      console.error("Error en getMyPets:", error.message);
      res.status(400).json({ error: error.message });
    }
  },
};

export default PetController;