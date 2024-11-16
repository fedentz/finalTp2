import {User, Role} from "../models/index.js";
import {genToken, verifyToken} from "../utils/token.js"

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
        try {
            const data = await User.create(userData)
            return data
        } catch(error){
            throw error
        }
    }
    loginService=async(user)=> {
        try {
            const {mail, password} = user
            const userLogin = await User.findOne({where:{mail}})
            if (!userLogin){
                throw new Error("User not found")
            } else{
                const comparePass = await userLogin.compare(password)
                console.log(comparePass)
            }

            const payload={
                id:userLogin.id,
                mail:userLogin.mail,
            }

            const token=genToken(payload)
            console.log("UserService " + "loginUserService + " + "token:" + token)

            return token
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
    me = async (token) => {
        try {
          const verify = verifyToken(token);
          return verify.data;
        } catch (error) {
          throw error;
        }
      }
    
}

export default UserService