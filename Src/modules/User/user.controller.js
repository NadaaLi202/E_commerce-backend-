import { userModel } from "../../../dataBase/models/user.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import slugify from "slugify"




const addUser = catchAsyncError(async (req,res,next) => {

   let foundUser = await userModel.findOne({email : req.body.email})

   if(foundUser){
    return next(new AppError('User already exist',409))
   }
    let user = new userModel(req.body)
    await user.save()
    res.status(200).json({message : 'User added successfully',user})
})

// const getAllUsers = catchAsyncError(async (req,res,next) => {

//     let users = await userModel.find()
//     if(!users){
//         return next(new AppError('Users not fetched',400))
//     }
//     res.status(200).json({message : 'Users fetched successfully',users})
// })

const getAllUsers = catchAsyncError(async (req,res,next) => {

    let apiFeatures =  new ApiFeatures(userModel.find(),req.query)
    .pagination().fields().searching().sorting().filtration()

    let users = await apiFeatures.mongooseQuery
    res.status(200).json({message : 'Users fetched successfully',page : apiFeatures.page ,users})
})

const getUserById = catchAsyncError(async (req,res,next) => {

    const {id} = req.params
    let user = await userModel.findById(id)

    if(!user){
        return next(new AppError('User not fetched',400))
    }
    res.status(200).json({message : 'User fetched successfully',user})
})


const updateUser = catchAsyncError(async(req,res,next) => {

    const {id} = req.params
    let User = await userModel.findByIdAndUpdate(id,req.body,{new : true})
    if(!User){
        return next(new AppError('User not update',400))
    }
    res.status(200).json({message : 'User updated successfully',User})
})


const deleteUser = catchAsyncError(async(req,res,next) => {

    const {id} = req.params
    let User = await userModel.findByIdAndDelete(id)
    if(!User){
        return next(new AppError('User not delete',400))
    }
    res.status(200).json({message : 'User deleted successfully',User})
})


const changeUserPassword = catchAsyncError(async (req,res,next) => {

    let {id} = req.params
    let {password} = req.body
    req.body.passwordChangedAt = Date.now()

    let user = await userModel.findByIdAndUpdate(id,{password},{new : true})
    if(!user){

        return next (new AppError('User not update',400))
    }
    res.status(200).json({message : 'User password updated successfully',user})
})


export {addUser,getAllUsers,getUserById,updateUser,deleteUser,changeUserPassword}