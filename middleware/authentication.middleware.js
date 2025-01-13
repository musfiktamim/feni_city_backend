import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import UserModel from "../model/User.Model.js"

dotenv.config()

async function authentication(req, res, next) {
    // console.log(req)
    try {
        const { authorization } = req.headers
        if (authorization && authorization.startsWith("Bearer")) {
            const token = authorization.split(" ")[1];
            const { _id } = jwt.verify(token, process.env.SECRETE_KEY);
            const findUser = await UserModel.findOne({ _id: _id }).select('-password');
            if (findUser) {
                req.user = findUser;
                next();
            } else {
                return res.send({ "mission": false, "message": "user not founded" });
            }
        } else {
            return res.send({ "mission": false, "message": "token not founded" });
        }
    } catch (error) {
        return res.send({ "mission": false, "message": error.message });
    }
}

export default authentication