import PetService from "../services/PetService.js";

const PetController = {
  async addPet(req, res) {
    try {
      const userId = req.userId;
      const { name, birthday, age } = req.body
      if (!name || !birthday || !age) {
        throw new Error("Los campos no pueden estar vacios");
      }
      const newPet = await PetService.addPet(userId, { name, birthday, age });
      res.status(200).send(newPet);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async getPet(req, res) {
    try {
      const userId = req.userId; 
      const { id } = req.params; 
      const pet = await PetService.getPet(id, userId);
      res.status(200).send(pet); 
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async updatePet(req, res) {
    try {
      const userId = req.userId; 
      const { id } = req.params; 
      const { name, birthday, age } = req.body; 
      if (!name || !birthday || !age) {
        throw new Error("Los campos no pueden estar vacios");
      }
      const updatedPet = await PetService.updatePet(
        id,
        userId,
        { name, birthday, age }, 
      );
      res.status(200).send(updatedPet);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async deletePet(req, res) {
    try {
      const userId = req.userId; 
      const { id } = req.params; 
      const result = await PetService.deletePet(id, userId);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async getMyPets(req, res) {
    try {
      const userId = req.userId; 
      const pets = await PetService.getMyPets(userId);
      res.status(200).send(pets); 
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
};

export default PetController;