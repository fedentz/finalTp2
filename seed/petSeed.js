import Pet from "../models/Pet.js";
import User from "../models/User.js";

const petSeed = async () => {
  try {
    const users = await User.findAll(); // Obtener los usuarios existentes
    const pets = [];

    users.forEach((user) => {
      pets.push(
        {
          name: "Frida",
          age: 3,
          birthday: "2020-01-01",
          photo: null,
          userId: user.id,
        },
        {
          name: "Berta",
          age: 2,
          birthday: "2021-01-01",
          photo: null,
          userId: user.id,
        }
      );
    });

    await Pet.bulkCreate(pets);
    console.log("Pets seeded successfully!");
  } catch (error) {
    console.error("Error seeding pets:", error);
  }
};

export default petSeed;
