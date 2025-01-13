import mongoose from "mongoose";
import 'dotenv/config'

function ConnectDb() {
    mongoose.connect(process.env.MONGO_PORT).then((res) => {
        return console.log(`db is connected on ${process.env.MONGO_PORT}`)
    }).catch((err) => {
        console.log(err)
    })
}

export default ConnectDb