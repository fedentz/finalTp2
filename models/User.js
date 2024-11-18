import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt"

class User extends Model{

    compare = async(passwordTxtPlain)=>{
        const data =  await bcrypt.compareSync(passwordTxtPlain, this.password)
        return data
    }

}

User.init(
    {
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        mail:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        }, 
        RoleId:{
            type:DataTypes.INTEGER,
            defaultValue:2
        },
        salt:{
            type: DataTypes.STRING
        }
    },
    {
        sequelize:connection,
        modelName:"User"
    }
)

User.beforeCreate(async(user)=> {

const salt = await bcrypt.genSalt(10) 

user.salt = salt

const hash = await bcrypt.hash(user.password,salt)

user.password = hash

console.log(salt)
console.log("user.beforeCreate " + user)
})

export default User