import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import UserModel from "../model/User.Model.js"

dotenv.config()

async function authentication(req, res, next) {
    try {
        // console.log(req.headers.authorization)
        console.log(req)
        const token = req.cookies.token || req.headers.authorization.toString().split(" ")[1]
        if(token){
            const {_id} = jwt.verify(token,process.env.SECRETE_KEY)
            const findUser = await UserModel.findOne({_id:_id}).select('-password')
            if(findUser){
                req.user = findUser;
                next()
            }else{
                return res.send({mission:false,message:"you have invalid token"})
            }
        }else{
            return res.send({mission:false,message:"don't have token"})
        }
        
    } catch (error) {
        return res.send({ "mission": false, "message": error.message });
    }
}

export default authentication