import mongoose from "mongoose"


export const dbConnection = () => {
    mongoose.connect('mongodb+srv://Nadaali:Nadaali@cluster0.9staiq5.mongodb.net/ecommerce')
    .then( () => {
        console.log('Database connected successfully')
    })
    .catch((err) => {
        console.log('Database connection failed',err)
    })
}
//'mongodb+srv://Nadaali:Nadaali@cluster0.9staiq5.mongodb.net/ecommerce'
//mongodb://127.0.0.1:27017/noon'