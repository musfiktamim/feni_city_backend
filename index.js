import express from "express"
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"

import cluster from "node:cluster"
import os from "node:os"

const numberOfCpu = os.cpus().length

import ConnectDb from "./config/db.connect.js"
import router from "./routes/Routes.route.js";

const app = express();
const PORT = process.env.PORT

app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "150mb" }))
app.use(express.json({ limit: "50mb" }))

app.use(router)

if(cluster.isPrimary){
    for(let i=0;i<numberOfCpu;i++){
        cluster.fork()
    }
}else{
    app.listen(PORT, async () => {
        ConnectDb()
        console.log(`server is running on http://localhost:${PORT} pid:${process.pid}`);
    })
}
