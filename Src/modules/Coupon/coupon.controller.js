
import { couponModel } from "../../../dataBase/models/coupon.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import  qrcode from "qrcode"


const addCoupon = catchAsyncError(async(req,res,next) => {

    let coupon = new couponModel(req.body)
    await coupon.save()
    if(!coupon){
        return next(new AppError('Coupon do not add',400))
    }
    res.status(200).json({message:"Coupon added successfully",coupon})
})


const getCouponById = catchAsyncError(async(req,res,next) =>{

    const {id} = req.params
    let coupon = await couponModel.findById(id)
    let url = await  qrcode.toDataURL(coupon.code)

    if(!coupon){
        return next(new AppError('Coupon not found ',400))
    }
    res.status(200).json({message:"Coupon founded successfully",coupon,url})
})

const getAllCoupons = catchAsyncError (async(req,res,next) => {

    let apiFeatures =  new ApiFeatures(couponModel.find(),req.query)
    .pagination().fields().searching().sorting().filtration()
  
    let coupons = await apiFeatures.mongooseQuery
    res.status(200).json({message: 'Coupons fetched successfully',page: apiFeatures.page,coupons})

})


const updateCoupon = catchAsyncError(async(req,res,next) =>{

    const {id} = req.params
    let coupon = await couponModel.findByIdAndUpdate(id,req.body,{new:true})
    if(!coupon){
        return next(new AppError('Coupon do not update ',401))
    }
    res.status(200).json({message:"Coupon updated successfully",coupon})
})

const deleteCoupon = catchAsyncError(async(req,res,next) =>{

    const {id} = req.params
    let coupon = await couponModel.findByIdAndDelete(id)
    if(!coupon){
        return next(new AppError('Coupon do not delete ',401))
    }
    res.status(200).json({message:"Coupon deleted successfully",coupon})
})

export {addCoupon,getCouponById,getAllCoupons,updateCoupon,deleteCoupon}