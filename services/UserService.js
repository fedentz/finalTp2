class UserService{
    getAllUsersService=async()=> {
        return "getAllUserService"
    }
    getUserByIdService = async (id) => {
        return `getUserByIdService ${id}`;
    }
    createUserService=async(name, password)=> {
        return `createUserService ${name, password}`
    }
    updateUserService=async(id, name, password)=> {
        return `updateUserService ${id, name, password}`
    }
    deleteUserService=async(id)=> {
        return `deleteUserService ${id}`
    }
}

export default UserService