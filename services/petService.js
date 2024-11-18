import Pet from "../models/Pet.js";

const PetService = {
  async addPet(userId, petData, file) {
    const photoPath = file ? `uploads/${file.filename}` : null; 
    const newPet = await Pet.create({
      ...petData,
      userId, 
      photo: photoPath,
    });
    return newPet;
  },
  async getPet(petId, userId) {
    const pet = await Pet.findOne({ where: { id: petId, userId } });
  
    if (!pet) {
      throw new Error("Pet not found or you don't have permission to view it.");
    }
  
    return pet; 
  },
  async updatePet(petId, userId, updateData, file) {
    const pet = await Pet.findOne({ where: { id: petId, userId } });
    if (!pet) {
      throw new Error("Pet not found or you don't have permission to update it.");
    }
  
    const photoPath = file ? `uploads/${file.filename}` : pet.photo;
  
    await pet.update({ ...updateData, photo: photoPath });
    return pet;
  },
  async deletePet(petId, userId) {
    const pet = await Pet.findOne({ where: { id: petId, userId } });
    if (!pet) {
      throw new Error("Pet not found or you don't have permission to delete it.");
    }
  
    await pet.destroy();
    return { message: "Pet deleted successfully." };
  },
  async getMyPets(userId) {
    const pets = await Pet.findAll({ where: { userId } });
    console.log("petsServide-getMyPets- pets:",pets)
    return pets;
  }
  
};

export default PetService;