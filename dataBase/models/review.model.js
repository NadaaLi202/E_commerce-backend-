
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    user : {  // user id
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    },

    product : {  // product id
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product',
        // required : true
    },
    comment : {
        type : String,
        required : true,
        trim : true,
        minLength : [3, 'Comment must be at least 3 characters long'],
        maxLength : [100, 'Comment must be at most 100 characters long']
    },
    ratings: {
        type: Number,
        min: 1,
        max : 5
    },

},{timestamps: true})

// mongoose middleware

// reviewSchema.pre(['find','findOne'], function () {
//     this.populate('user','name')
// })

reviewSchema.pre(/^find/, function () {
    this.populate('user','name')
})



export const reviewModel = mongoose.model('review',reviewSchema)