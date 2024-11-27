import mongoose from "mongoose"


export const dbConnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/noon')
    .then( () => {
        console.log('Database connected successfully')
    })
    .catch((err) => {
        console.log('Database connection failed',err)
    })
}
