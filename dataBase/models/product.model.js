import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
        unique : [true, 'Product title must be unique'],
        trim : true ,
        minLength : [3, 'Product title must be at least 3 characters long']
    },

    slug : {
        type : String,
        lowercase : true,
    },
    description : {
        type : String,
        required : true,
        trim : true,
        minLength : [3, 'Product description must be at least 3 characters long'],
        maxLength : [500, 'Product description must be at most 500 characters long']
    },
    
    price : {
        type : Number,
        required : true,
        min : [0,'Product price can not be negative'],
    },
    priceAfterDiscount : {
        type : Number,
        default : 0
    },

    quantity : {
        type : Number,
        required : true,
        min : [0,'Product quantity can not be negative'],
        default : 0
    },

    soldCount : {
        type : Number,
        default : 0,
        min : [0,'Product sold count can not be negative'],
    },
    
    imageCover : {
        type : String,
        // required : true
    },

    images : {
        type : [String],
        default : [],
    },

    category : {  // category id
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        required : [true,'Product must belong to a category']
    },

    subcategory : {  // subcategory id
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subcategory',
        required : [true,'Product must belong to a subcategory']
    },

    brand : {  // brand id
        
        type : mongoose.Schema.Types.ObjectId,
        ref : 'brand',
        required : [true,'Product must belong to a brand']
    },
    ratingAverage : {
        type : Number,
        min: [1, 'Rating must be at least 1'],
        max : [5, 'Rating must be at most 5'],
    },
    ratingCount : {
        type : Number,
        default : 0,
        min: [0, 'Rating count must be at least 0'],
    },
    discount : {
        type : Number,
        default : 0
    },
    availableColors : {
        type : [String],
        default : []
    }
    
},{timestamps: true ,toJSON : {virtuals : true}, toObject : {virtuals : true}})
//  3 step toJSON

productSchema.post('init',(doc) => {
    
    doc.imageCover = "http://localhost:3001/product/"+ doc.imageCover // single image
    // doc.imageCover = process.env.BASE_URL +"/product/" + doc.imageCover
    console.log(doc.imageCover)
    doc.images = doc.images.map((path => // array of images
        "http://localhost:3001/product/"+ path))
        console.log(doc.images)
})

// virtual populate 
// 1 step
productSchema.virtual('reviews', {

    ref: 'review',
    localField: '_id',  // product
    foreignField: 'product' // review
});
// 2 step
productSchema.pre(/^find/, function () {
    this.populate('reviews')
})


export const productModel = mongoose.model('product',productSchema)