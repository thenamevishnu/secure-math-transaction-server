import mongoose from "mongoose"

export const connect = (url) => {
    mongoose.connect(url).then(() => {
        console.log("Transaction database connected")
    }).catch(err => {
        console.log("Error while connecting transaction database: ",err.message)
    })
}