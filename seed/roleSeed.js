import Role from "../models/Role.js"

async function roleSeed(){
    try{
        await Role.bulkCreate([{name: "Admin"}, {name: "User"}])
    } catch (error){
        console.log("roleSeed " + error)
    }
}

//roleSeed() para crear desde comando con npm run roleSeed

export default roleSeed