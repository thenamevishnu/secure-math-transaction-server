import express from "express"
import env from "dotenv"
import cors from "cors"
import transactionRouter from "./Routes/transaction.route.mjs"
import * as db from "./Database/db.mjs"
import nodecron from "node-cron"
import axios from "axios"

env.config()
db.connect(process.env.TRANSACTION_DB)

const app = express()

app.use(cors({
    origin: "*",
    methods: "*"
}))
app.use(express.json())

app.get("/status", async (req, res) => {
    return res.status(200).send({ status: "OK"})
})

nodecron.schedule("* * * * *", async () => {
    const { data } = await axios.get(`${process.env.SERVER}/status`)
    console.log(data.status);
})

app.use("/", transactionRouter)

app.listen(process.env.TRANSACTION_PORT || 5000, () => {
    console.log("Transaction server started ✅")
})