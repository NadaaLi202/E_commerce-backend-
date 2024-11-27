import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        unique : [true, 'Category name must be unique'],
        trim : true ,
        minLength : [2, 'Category name must be at least 2 characters long']
    },

    slug : {
        type : String,
        lowercase : true,
        required : true
    },

    image : {
        type : String
    }
},{timestamps: true})


export const categoryModel = mongoose.model('category',categorySchema)