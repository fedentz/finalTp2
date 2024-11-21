import UserService from "../services/UserService.js";

class UserController{
    userService = new UserService();
    getAllUsers= async(req, res)=>{
        try{
            const data = await this.userService.getAllUsersService()
            res
            .status(200)
            .send({success:true, message: data})
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message})
        }
    }
    getUserById= async(req, res)=>{
        try{
            const {id}=req.params
            const data = await this.userService.getUserByIdService(id)
            res
            .status(200)
            .send({success:true, message: data})
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message})
        }
    }
    createUser= async(req, res)=>{
        try{
            const{name, password, mail, RoleId} = req.body 
            if (!name || !password || !mail){
                throw new Error("Los campos no deben estar vacios")
            }
            const emailFormatoCorrecto = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if (!emailFormatoCorrecto.test(mail)){
                throw new Error("Formato invalido email")
            }
            const data = await this.userService.createUserService({name, password, mail, RoleId})
            res
            .status(200)
            .send({success:true, message: data})
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message})
        }
    }
    login= async(req, res)=>{
        try{
            const{password, mail} = req.body
            if (!password || !mail){
                throw new Error("Los campos no deben estar vacios")
            } 
            const data = await this.userService.loginService({password, mail})
            res.cookie("token",data)
            res
            .status(200)
            .send({success:true, message: "Usuario loggeado con exito"})
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message})
        }
    }
    updateUser= async(req, res)=>{
        try{
            const {id} = req.params
            const{name, password} = req.body 
            const data = await this.userService.updateUserService(id, name, password)
            res
            .status(200)
            .send({success:true, message: data})
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message})
        }
    }
    deleteUser= async(req, res)=>{
        try{
            const {id} = req.params
            const data = await this.userService.deleteUserService(id)
            res
            .status(200)
            .send({success:true, message: data})
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message})
        }
    }
    getMe = async (req, res) => {
        try {
          const { token } = req.cookies
          const user = await this.userService.me(token)    
          res.status(200).send({ success: true, message: user})
        } catch (error) {
          res.status(400).send({
            success: false,
            message: error.message,
          })
        }
      }
      logout = async (req, res) => {
        try {
            res.clearCookie("token")
            res
                .status(200)
                .send({ success: true, message: "Se hizo el Logout" });
        } catch (error) {
          res.status(400).send({
            success: false,
            message: error.message,
          })
        }
      }

}


export default UserController