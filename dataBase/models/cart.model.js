import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

user: { // userId
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
},

cartItems: [
    {
    product : {type: mongoose.Schema.ObjectId,ref: 'product'},
    quantity: {type: Number , default: 1},
    price: Number
}
],
totalPrice: {
    type: Number,
    min:0
},

totalPriceAfterDiscount: {
    type: Number,
    min:0
},

discount: {
    type: Number,
    default: 0
}

},{timestamps: true})

export const cartModel = mongoose.model('cart',cartSchema)