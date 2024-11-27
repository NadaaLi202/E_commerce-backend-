import { categoryModel } from "../../../dataBase/models/category.model.js"
import slugify from "slugify"
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import * as factory from "../Handlers/factor.handler.js"



const  addCategory = catchAsyncError(async (req ,res,next) => {

    // const {name} = req.body
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    // await categoryModel.insertMany({name})
    // await categoryModel.create({name})

    // let result = new categoryModel({name,slug : slugify(name)})
    let result = new categoryModel(req.body)
    await result.save()
    if (!result) {
     return next(new AppError('Category not added',400))
    }
    res.status(200).json({message : 'Category added successfully',result})
})




// const getAllCategories = catchAsyncError(async (req,res,next) => {


//     let category = await categoryModel.find()

//     !category && next(new AppError('Category not found',400))
//     category && res.status(200).json({message : 'Categories fetched successfully',category})
// })

const getAllCategories = catchAsyncError(async (req,res,next) => {


    let category = await categoryModel.find()

    if (!category) {
        return next(new AppError('Category not fetched',400))
    }
res.status(200).json({message : 'Categories fetched successfully',category})
})

const  getCategoryById = catchAsyncError( async (req ,res,next) => { // get method don't have body

    const {id} = req.params
    let category = await categoryModel.findById(id)

    if (!category) {
       return next (new AppError('Category not fetched',400))
    }
    res.status(200).json({message : 'Category fetched successfully',category})

})

const updateCategory = catchAsyncError(async (req,res,next) => {

    const {id} = req.params
    // const {name} = req.body
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename

    let category = await categoryModel.findByIdAndUpdate(id,req.body,{new : true})

    if (!category) {
     return next (new AppError('Category not updated',400))
    }
    res.status(200).json({message : 'Category updated successfully',category})

}
)
const deleteCategory = catchAsyncError(async (req,res,next) => {

    const {id} = req.params;

    let category = await categoryModel.findByIdAndDelete(id)

    if (!category) {
     return next (new AppError('Category not deleted',400))
}
res.status(200).json({message : 'Category deleted successfully',category})
})

// const deleteCategory = factory.deleteOne (categoryModel)


export {addCategory,getAllCategories,getCategoryById,updateCategory,deleteCategory}