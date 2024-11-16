import UserService from "../services/UserService.js";

class UserController{
    userService = new UserService();
    getAllUsers= async(req, res)=>{
        try{
            const data = await this.userService.getAllUsersService()
            res
            .status(200)
            .send({success:true, message: data});
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message});
        }
    }
    getUserById= async(req, res)=>{
        try{
            const {id}=req.params
            const data = await this.userService.getUserByIdService(id)
            res
            .status(200)
            .send({success:true, message: data});
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message});
        }
    }
    createUser= async(req, res)=>{
        try{
            const{name, password, mail, RoleId} = req.body //para filtrar la info que viene del body 
            const data = await this.userService.createUserService({name, password, mail, RoleId})
            console.log(data)
            res
            .status(200)
            .send({success:true, message: data});
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message});
        }
    }
    login= async(req, res)=>{
        try{
            const{password, mail} = req.body //para filtrar la info que viene del body 
            const data = await this.userService.loginService({password, mail})
            console.log(data)
            res.cookie("token",data)
            res
            .status(200)
            .send({success:true, message: "Usuario loggeado con exito"});
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message});
        }
    }
    updateUser= async(req, res)=>{
        try{
            const {id} = req.params
            const{name, password} = req.body 
            const data = await this.userService.updateUserService(id, name, password)
            res
            .status(200)
            .send({success:true, message: data});
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message});
        }
    }
    deleteUser= async(req, res)=>{
        try{
            const {id} = req.params
            const data = await this.userService.deleteUserService(id)
            res
            .status(200)
            .send({success:true, message: data});
        } catch(error){
            res
            .status(400)
            .send({success:false, message: error.message});
        }
    }
    getMe = async (req, res) => {
        try {
          const { token } = req.cookies;
          //console.log(`🚀 ~ UserControllers ~ getMe= ~ token:`, token)
          const user = await this.userService.me(token);
          //console.log(`🚀 ~ UserControllers ~ login= ~ user:`, user)
    
          res.status(200).send({ success: true, message: user});
        } catch (error) {
          res.status(400).send({
            success: false,
            message: error.message,
          });
        }
      };

}


export default UserController