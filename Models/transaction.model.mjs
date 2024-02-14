import { Schema, Types, model } from "mongoose";

const transactions = new Schema({
    user_id: {
        type: Types.ObjectId
    },
    first_number: {
        type: Number,
        required: true
    },
    second_number: {
        type: Number,
        required: true
    },
    result: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

export const transactionDB = model("transactions", transactions)