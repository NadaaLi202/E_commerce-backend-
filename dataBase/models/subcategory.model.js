import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        trim : true,
        minLength : [2, 'Subcategory name must be at least 2 characters long']
    },

    slug : {
        type : String,
        lowercase : true,
        required : true,
    },
    
    category : {  // category id
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        required : true
    }
},{timestamps: true})

export const subcategoryModel = mongoose.model('subcategory',subcategorySchema)