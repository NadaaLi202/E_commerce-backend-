import slugify from "slugify";
import { subcategoryModel } from "../../../dataBase/models/subcategory.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";



const addSubcategory = catchAsyncError(async (req,res,next) => {

    const {name ,category} = req.body

    let subcategory = new subcategoryModel({name,slug : slugify(name),category})
    
    await subcategory.save()
    if (!subcategory){
        return next(new AppError('Subcategory not added',400))
    }
    res.status(200).json({message : 'Subcategory added successfully',subcategory})
})

const getAllSubcategories = catchAsyncError (async (req, res, next) => {

    let filter = {}
    if (req.params.categoryId){
        filter = {category : req.params.categoryId}
    }

    let subcategories = await subcategoryModel.find(filter)

    if (!subcategories){
        return next (new AppError('Subcategories not fetched',400))
    }
    res.status(200).json({message : 'subcategories fetched successfully',subcategories})
})

const getSubcategoryById = catchAsyncError(async (req,res,next) => {

    const {id} = req.params

    let Subcategory = await subcategoryModel.findById(id)

    if(!Subcategory) {

        return next (new AppError('Subcategory not fetch'))
    }
    res.status(200).json({message : 'subcategories fetched successfully',Subcategory})
})

const updateSubcategory = catchAsyncError(async (req,res,next) => {

    const {id} = req.params
    const {name,category} = req.body

    let subcategory = await subcategoryModel.findByIdAndUpdate(id,{ name, category ,slug : slugify(name)},{new : true})

    if (!subcategory){
        return next (new AppError('Subcategory not updated'))
    }

    res.status(200).json({message : 'Subcategory updated successfully'})
})


const deleteSubcategory = catchAsyncError (async (req,res,next) => {

    const {id} = req.params

    let subcategory = await subcategoryModel.findByIdAndDelete(id)

    if (!subcategory){
        return next (new AppError('Subcategory not deleted'))
    }
    res.status(200).json({message : 'Subcategory deleted successfully',subcategory})

})

export {addSubcategory,getAllSubcategories,getSubcategoryById,updateSubcategory,deleteSubcategory}