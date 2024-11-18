import Role from "../models/Role.js"

async function roleSeed() {
    await Role.bulkCreate([{ name: "Admin" }, { name: "User" }]);
  }

export default roleSeed