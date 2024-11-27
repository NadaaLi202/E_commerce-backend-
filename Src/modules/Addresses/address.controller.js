import { userModel } from "../../../dataBase/models/user.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";



const addAddress = catchAsyncError(async(req,res,next) => {

    let Address = await userModel.
    findByIdAndUpdate(req.user._id,{$addToSet:{addresses: req.body}},{new : true})

    if(Address){
    return res.status(200).json({message: 'Address added successfully',Address:Address.addresses})
    }
        next(new AppError('Address not added to user ',401))
})


const getAllUserToAddress = catchAsyncError(async(req,res,next) => {

    let Address = await userModel.findOne({_id:req.user._id})

    if(Address){
    return res.status(200).json({message: 'Address fetched successfully',Address:Address.addresses})
    }
        next(new AppError('Address do not fetch',401))
})

const removeAddress = catchAsyncError(async(req,res,next) => {
    
    let Address = await userModel.
    findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.body.addresses}}},{new: true})

    if(Address){
    return res.status(200).json({message: 'Address removed successfully',Address:Address.addresses})
    }
        next(new AppError('Address not remove',401))
})

export {addAddress,removeAddress,getAllUserToAddress}



