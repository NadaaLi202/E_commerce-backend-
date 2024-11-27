import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({

    code : {
        type : String,
        required : [true,'Coupon code is required'],
        unique : [true, 'Coupon code must be unique'],
        trim : true
    },

    discount : {
        type : Number,
        required : [true,'Coupon discount is required'],
        min : [0,'Coupon discount can not be negative'],
    },

    expireDate : {
        type : Date,
        required : [true,'Coupon expiry date is required'],
    },
},{timestamps: true})


export const couponModel = mongoose.model('coupon',couponSchema)