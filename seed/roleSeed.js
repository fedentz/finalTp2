import Role from "../models/Role.js"

async function roleSeed() {
  //console.log("goku")
    await Role.bulkCreate([{ name: "Admin" }, { name: "User" }]);
  }

export default roleSeed