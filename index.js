import express from "express"
import "dotenv/config"
import cors from "cors"

import ConnectDb from "./config/db.connect.js"
import router from "./routes/Routes.route.js";

const app = express();
const PORT = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(express.json({ limit: "50mb" }))

app.use(router)



app.listen(PORT, async () => {
    ConnectDb()
    console.log(`server is running on http://localhost:${PORT}`);
})