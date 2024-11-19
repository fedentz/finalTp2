import bcrypt from "bcrypt";
import User from "../models/User.js";

const userSeed = async () => {
  const salt = await bcrypt.genSalt(10);

  const users = [
    {
      name: "Admin User",
      mail: "admin@example.com",
      password: await bcrypt.hash("admin123", salt), // Contraseña: admin123
      RoleId: 1, // Admin
    },
    {
      name: "Regular User",
      mail: "user@example.com",
      password: await bcrypt.hash("user123", salt), // Contraseña: user123
      RoleId: 2, // Usuario normal
    },
  ];

  try {
    await User.bulkCreate(users);
    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

export default userSeed;
