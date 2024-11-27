
import mongoose from "mongoose";
const brandSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        unique : [true, 'Brand name must be unique'],
        trim : true,
        minLength : [3, 'Brand name must be at least 3 characters long']
    },
    slug :{
        type : String,
        lowercase: true,
        required: true
    },

    logo : {
        type : String,
    }
},{timestamps: true})

brandSchema.post('init',(doc) => {

    console.log(doc)
    doc.logo = "http://localhost:3001/brand/"+ doc.logo
    // doc.logo = process.env.BASE_URL +"/brand/" + doc.logo
}) 

export const brandModel = mongoose.model('brand',brandSchema)