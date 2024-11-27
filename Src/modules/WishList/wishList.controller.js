import { userModel } from "../../../dataBase/models/user.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";



const addToWishList = catchAsyncError(async(req,res,next) => {

    const {product} = req.body // product_id
    let wishList = await userModel.
    findByIdAndUpdate(req.user._id,{$addToSet:{wishList: product}},{new : true})

    if(wishList){
    return res.status(200).json({message: 'Wishlist added successfully',wishList:wishList.wishList})
    }
        next(new AppError('Product do not add to wishlist',401))
})


const getAllUserToWishList = catchAsyncError(async(req,res,next) => {

    let wishList = await userModel.findOne({_id:req.user._id}).populate('wishList')

    if(wishList){
    return res.status(200).json({message: 'Wishlist fetched successfully',wishList:wishList.wishList})
    }
        next(new AppError('Product do not found to wishlist',401))
})

const removeFromWishList = catchAsyncError(async(req,res,next) => {

    const {product} = req.body
    let wishList = await userModel.
    findByIdAndDelete(req.user._id,{$pull:{wishList:product}},{new:true})

    if(wishList){
    return res.status(200).json({message: 'Wishlist removed successfully',wishList:wishList.wishList})
    }
        next(new AppError('Wishlist not remove',401))
})

export {addToWishList,removeFromWishList,getAllUserToWishList}



