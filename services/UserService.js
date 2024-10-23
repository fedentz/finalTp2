import {User, Role} from "../models/index.js";

class UserService{
    getAllUsersService=async()=> {
        //return "getAllUserService"
        try {
            const data = await User.findAll({
                attributes:["name", "password", "mail", "Roleid"],
                include: Role
            })
            return data
        } catch(errror){
            throw error
        }
    }
    getUserByIdService = async (id) => {
        return `getUserByIdService ${id}`;
    }
    createUserService=async(userData)=> {
        //`createUserService ${name} ${password} ${mail} `
        try {
            const data = await User.create(userData)
            return data
        } catch(error){
            throw error
        }
    }
    updateUserService=async(id, name, password)=> {
        return `updateUserService ${id} ${name} ${password}`
    }
    deleteUserService=async(id)=> {
        return `deleteUserService ${id}`
    }
}

export default UserService