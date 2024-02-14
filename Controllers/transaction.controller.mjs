import { transactionDB } from "../Models/transaction.model.mjs"

const addTransaction = async (req, res) => {
    try {
        const { firstNumber, secondNumber, user_id } = req.body
        if (!user_id) {
            return res.status(400).send({
                message: "user_id is missing"
            })
        }
        if (!firstNumber) {
            return res.status(400).send({
                message: "First number is missing"
            })
        }
        if (!secondNumber) {
            return res.status(400).send({
                message: "Second number is missing"
            })
        }
        if (typeof firstNumber != "number" || typeof secondNumber != "number") {
            return res.status(400).send({
                message: "Enter valid numbers"
            })
        }
        const result = eval(firstNumber + secondNumber)
        const { _id: response } = await transactionDB.create({
            user_id: user_id,
            first_number: firstNumber,
            second_number: secondNumber,
            result: result
        })
        if (response) {
            return res.status(201).send({
                result: {
                    _id: response,
                    first_number: firstNumber,
                    second_number: secondNumber,
                    result: result
                },
                message: "success"
            })
        }
        return res.status(500).send({
            message: "unknown error"
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
}

const getTransactions = async (req, res) => {
    try {
        const { user_id } = req.query
        if (!user_id) {
            return res.status(200).send({
                message: "user_id is missing"
            })
        }
        const response = await transactionDB.find({
            user_id: user_id
        }, {
            first_number: 1,
            second_number: 1,
            result: 1
        }).sort({ createdAt: -1 })
        if (Array.isArray(response)) {
            return res.status(200).send({
                result: response,
                message: "success"
            })
        }
        return res.status(500).send({
            message: "unknown error"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err.message
        })
    }
}

export default {
    addTransaction,
    getTransactions
}