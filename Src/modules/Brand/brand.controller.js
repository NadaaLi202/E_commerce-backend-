import { brandModel } from "../../../dataBase/models/brand.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import slugify from "slugify"




const addBrand = catchAsyncError(async (req,res,next) => {

    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let brands = new brandModel(req.body)
    await brands.save()

    if(!brands){
        return next(new AppError('Brand not added',400))
    }
    res.status(200).json({message : 'Brand added successfully',brands})
})

const getAllBrands = catchAsyncError(async (req,res,next) => {

    let brands = await brandModel.find()
    if(!brands){
        return next(new AppError('Brands not fetched',400))
    }
    res.status(200).json({message : 'Brands fetched successfully',brands})
})


const getBrandById = catchAsyncError(async (req,res,next) => {

    const {id} = req.params
    let brand = await brandModel.findById(id)

    if(!brand){
        return next(new AppError('Brand not fetched',400))
    }
    res.status(200).json({message : 'Brand fetched successfully',brand})
})


const updateBrand = catchAsyncError(async(req,res,next) => {

    const {id} = req.params
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    // const {name} = req.body

    let Brand = await brandModel.findByIdAndUpdate(id,req.body,{new : true})
    if(!Brand){
        return next(new AppError('Brand not update',400))
    }
    res.status(200).json({message : 'Brand updated successfully',Brand})
})


const deleteBrand = catchAsyncError(async(req,res,next) => {

    const {id} = req.params
    let Brand = await brandModel.findByIdAndDelete(id)
    if(!Brand){
        return next(new AppError('Brand not delete',400))
    }
    res.status(200).json({message : 'Brand deleted successfully',Brand})
})


export {addBrand,getAllBrands,getBrandById,updateBrand,deleteBrand}