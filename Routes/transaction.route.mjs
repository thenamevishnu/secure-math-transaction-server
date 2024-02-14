import { Router } from "express"
import transactionController from "../Controllers/transaction.controller.mjs"
import { Authentication } from "../Middleware/Authentication.mjs"

const app = Router()

app.post("/transaction", Authentication, transactionController.addTransaction)
app.get("/transactions", Authentication,transactionController.getTransactions)

export default app