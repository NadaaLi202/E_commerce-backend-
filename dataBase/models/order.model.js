import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    cartItems: [
        {
        product : {type: mongoose.Schema.ObjectId,ref: 'product'},
        quantity: Number,
        price: Number,
    }
    ],
    totalOrderPrice: Number,
    shoppingAddress: {
        street: String,
        city: String,
        phone: String
    },
    paymentMethod: {
        type: String,
        enum: ['cash','card'],
        default: 'cash'
    },
    isPaid : {
        type: Boolean,
        default: false
    },
    paidAt : {
        type : Date
    },
    isDelivered : {
        type: Boolean,
        default: false
    },
    deliveredAt : {
        type : Date
    },

},{timestamps: true})

export const orderModel = mongoose.model('order',orderSchema)