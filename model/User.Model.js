import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter username"]
    },
    email: {
        type: String,
        required: [true, "please enter email"]
    },
    phone: {
        type: String,
        required: [true, "please enter phone or in number"]
    },
    password: {
        type: String,
        required: [true, "password must be required"]
    }
})

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;