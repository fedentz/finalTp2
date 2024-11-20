import Pet from "../models/Pet.js";

const PetService = {
  async addPet(userId, petData) {
    const newPet = await Pet.create({
      ...petData,
      userId, 
    });
    return newPet;
  },
  async getPet(petId, userId) {
    const pet = await Pet.findOne({ where: { id: petId, userId } });
    if (!pet) {
      throw new Error("No se encontro esta mascota");
    }
    return pet; 
  },
  async updatePet(petId, userId, updateData) {
    const pet = await Pet.findOne({ where: { id: petId, userId } });
    if (!pet) {
      throw new Error("No se encontro esta mascota");
    }
    await pet.update({ ...updateData});
    return pet;
  },
  async deletePet(petId, userId) {
    const pet = await Pet.findOne({ where: { id: petId, userId } });
    if (!pet) {
      throw new Error("No se encontro esta mascota");
    }
  
    await pet.destroy();
    return { message: "Se borro a la mascota" };
  },
  async getMyPets(userId) {
    const pets = await Pet.findAll({ where: { userId } });
    return pets;
  }
  
};

export default PetService;