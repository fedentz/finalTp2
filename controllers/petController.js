import PetService from "../services/PetService.js";

const PetController = {
  //VALIDAR tipos de datos!!
  async addPet(req, res) {
    try {
      const userId = req.userId;
      const { name, birthday, age } = req.body
      if (!name || !birthday) {
        return res.status(400).send({ error: "Name y Birthdayno pueden estar vacias" });
      }
      const newPet = await PetService.addPet(userId, { name, birthday, age });
      res.status(201).send(newPet);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async getPet(req, res) {
    try {
      const userId = req.userId; 
      const { id } = req.params; 
      const pet = await PetService.getPet(id, userId);
      res.status(201).send(pet); 
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  //VALIDAR tipos de datos!!
  async updatePet(req, res) {
    try {
      const userId = req.userId; 
      const { id } = req.params; 
      const { name, birthDay, age } = req.body; 

      const updatedPet = await PetService.updatePet(
        id,
        userId,
        { name, birthDay, age }, 
      );

      res.status(201).send(updatedPet);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async deletePet(req, res) {
    try {
      const userId = req.userId; 
      const { id } = req.params; 

      const result = await PetService.deletePet(id, userId);
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async getMyPets(req, res) {
    try {
      const userId = req.userId; 
      const pets = await PetService.getMyPets(userId);
      res.status(201).send(pets); 
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
};

export default PetController;