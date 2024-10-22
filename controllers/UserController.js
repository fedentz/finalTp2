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
            const{name, password} = req.body 
            const data = await this.userService.createUserService(name, password)
            res
            .status(200)
            .send({success:true, message: data});
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

}

export default UserController