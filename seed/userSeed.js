import bcrypt from "bcrypt";
import User from "../models/User.js";

const userSeed = async () => {
  const salt = await bcrypt.genSalt(10);

  const users = [
    {
      name: "Admin User",
      mail: "admin@gmail.com",
      password: await bcrypt.hash("admin123", salt),
      RoleId: 1,
    },
    {
      name: "Regular User",
      mail: "user@gmail.com",
      password: await bcrypt.hash("user123", salt),
      RoleId: 2,
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
