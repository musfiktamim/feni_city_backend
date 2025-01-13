import dotenv from "dotenv"
import bcrypt from "bcrypt"
import UserModel from "../model/User.Model.js"
import jwt from "jsonwebtoken"
import { cloudNaryGetUrl } from "../module/cloudnaris.js"
dotenv.config()
class User {


    static UserGet = (req, res) => {
        res.send(req.user)
    }
    static UserPut = (req, res) => {
        res.send("")
    }
    static UserDelete = (req, res) => {
        res.send("")
    }
    static UserPost = async (req, res) => {
        try {

            const { username, email, password, phone } = req.body
            // console.log(req.body)
            if (username && email && phone && password) {
                if (username !== email) {
                    if (password.length > 7) {
                        const findEmail = await UserModel.findOne({ email: email })
                        if (!findEmail) {
                            const findPhone = await UserModel.findOne({ phone: phone });
                            if (!findPhone) {
                                const hashPass = await bcrypt.hash(password, 10)
                                const SaveOrNo = await UserModel({
                                    email: email,
                                    phone: phone,
                                    username: username,
                                    password: hashPass
                                })
                                const saved = await SaveOrNo.save();
                                if (saved) {
                                    const payload = {
                                        _id: saved._id
                                    }
                                    const token1 = await jwt.sign(payload, process.env.SECRETE_KEY, { expiresIn: "30d" });
                                    const token = "Bearer " + token1
                                    return res.send({ message: "saved successfully", mission: true, token: token })
                                } else {
                                    return res.send({ message: "something went wrong", mission: false })
                                }

                            } else {
                                return res.send({ message: "this phone number already have", mission: false })
                            }

                        } else {
                            return res.send({ message: "this email already have", mission: false })
                        }
                    } else {
                        return res.send({ message: "password must be greater then 7 char", mission: false })
                    }
                } else {
                    return res.send({ message: "username or email is same", mission: false })
                }
            } else {
                return res.send({ message: "please fill all field", mission: false })
            }
        } catch (error) {
            return res.send({ message: error.message, mission: false })
        }
    }
    static userLogIn = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email) {
                const findUser = await UserModel.findOne({ email: email })
                if (password) {
                    if (findUser) {
                        const passCheck = await bcrypt.compare(password, findUser.password)
                        if (passCheck) {
                            const payload = {
                                _id: findUser._id
                            }
                            const token1 = await jwt.sign(payload, process.env.SECRETE_KEY, { expiresIn: "30d" })
                            const token = "Bearer " + token1
                            return res.send({
                                mission: true, message: `successfuly logined on ${findUser.username}`, token: token
                            })
                        } else {
                            return res.send({ mission: false, message: `password or ${email ? "email" : phone ? "phone" : null} is never matching with between` })
                        }
                    } else {
                        return res.send({ mission: false, message: `password or ${email ? "email" : phone ? "phone" : null} is never matching with between` })
                    }
                } else {
                    return res.send({ mission: false, message: "you never entered password" })
                }
            } else {
                return res.send({ mission: false, message: "you never entered email or phone" })
            }
        } catch (error) {
            return res.send({ mission: false, message: error.message })
        }
    }
}


export default User