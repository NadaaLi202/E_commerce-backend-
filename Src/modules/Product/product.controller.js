import { productModel } from "../../../dataBase/models/product.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";





const addProduct = catchAsyncError(async (req,res,next) => {

    // if (!req.file || !req.file.filename) {
    //     return next(new AppError('Image not uploaded',400))
    // }

    req.body.slug = slugify(req.body.title);
    req.body.images = req.files.images.map((ele) => ele.filename);
    req.body.imageCover = req.files.imageCover[0].filename

    let product = new productModel(req.body)
    await product.save()

    if(!product) {
        return next(new AppError('Product not added',400))
    }
    res.status(200).json({message: 'Product added successfully',product})

})


const getAllProducts = catchAsyncError (async(req,res,next) => {

  let apiFeatures =  new ApiFeatures(productModel.find(),req.query)
  .pagination().fields().searching().sorting().filtration()



    // // pagination  //

    // let page = req.query.page * 1 || 1
    // if (req.query.page <= 0) page = 1
    // let skip = (page - 1) * 5

    // // filtration

    // let filtration = {...req.query }
    // let excludedQuery = ['page','sort','fields','keyword']
    // excludedQuery.forEach((ele) => {
    //     delete filtration[ele]

    // })
    // delete filtration.page
    // console.log(filtration)
    // filtration = JSON.stringify(filtration) // to string
    // filtration = filtration.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
    // filtration = JSON.parse(filtration)

    // build query
    // let  mongooseQuery =   productModel.find(filtration).skip(skip).limit(5)

    // sort

    // if (req.query.sort){
    //     console.log(req.query.sort)
    //     let sortedBy = req.query.sort.split(',').join(' ')
    //     console.log(sortedBy)
    //     mongooseQuery.sort(sortedBy)
    // }

    // search 

    // if (req.query.keyword){
    //     mongooseQuery.find(
    //         {
    //         $or :
    //          [
    //              {title : {$regex: req.query.keyword , $options: 'i'} },
    //             {description : {$regex: req.query.keyword , $options: 'i'}}
    //         ]
    //     })
    // }

    // selected fields

    // if (req.query.fields){
    //     console.log(req.query.fields)
    //     let fields = req.query.fields.split(',').join(' ')
    //     console.log (fields)
    //     mongooseQuery.select(fields)
    // }


    // execute query
    // let products = await mongooseQuery

    // if(!products) {
    //     return next(new AppError('Products not fetch',400))
    // }
    let products = await apiFeatures.mongooseQuery
    res.status(200).json({message: 'Product fetched successfully',page: apiFeatures.page,products})

})


const getProductById = catchAsyncError (async(req,res,next) => {

    const {id} = req.params
    let product = await productModel.findById(id)
    if(!product) {
        return next(new AppError('Product not fetch',400))
    }
    res.status(200).json({message: 'Product fetched successfully',product})

})

const updateProduct = catchAsyncError (async(req,res,next) => {

    const {id} = req.params
    if (req.body.title)   req.body.slug = slugify(req.body.title)

   let product = await productModel.findByIdAndUpdate(id,req.body,{new : true})
    if(!product) {
        return next(new AppError('Product not update',400))
    }
    res.status(200).json({message: 'Product updated successfully',product})

})


const deleteProduct = catchAsyncError (async(req,res,next) => {

    const {id} = req.params
    let product = await productModel.findByIdAndDelete(id)
    if(!product) {
        return next(new AppError('Product not delete',400))
    }
    res.status(200).json({message: 'Product deleted successfully',product})

})


export {addProduct,getAllProducts,getProductById,updateProduct,deleteProduct}