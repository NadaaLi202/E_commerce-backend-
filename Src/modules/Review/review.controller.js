import { reviewModel } from "../../../dataBase/models/review.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";



const addReview = catchAsyncError(async(req,res,next) => {

    // if (!req.body.comment) {
    //     return next(new AppError('Comment field is required', 400));
    // }

    req.body.user = req.user._id
    if(!req.user._id)  return next (new AppError('This user not found',409))
    let isReview = await reviewModel.findOne({ user: req.user._id,product : req.body.product })
    if (isReview) return next (new AppError('This user is already add review of this product',409))
    let review = new reviewModel(req.body)
    console.log(req.body)
    await review.save()

    res.status(200).json({message :"Review added successfully" ,review})
})


const getAllReviews = catchAsyncError (async(req,res,next) => {

    let apiFeatures =  new ApiFeatures(reviewModel.find(),req.query)
    .pagination().fields().searching().sorting().filtration()
  
    let reviews = await apiFeatures.mongooseQuery
    res.status(200).json({message: 'Product fetched successfully',page: apiFeatures.page,reviews})

})

const getReviewById = catchAsyncError(async (req,res,next) => {

    const {id} = req.params 

    let review = await reviewModel.findById(id)
    if(!review){
        return next(new AppError('Review not fetch',400))
    }
    res.status(200).json({message : "Review fetched successfully",review})
})

const updateReview = catchAsyncError(async (req,res,next) => {

    const {id} = req.params 

    let review = await reviewModel.findOneAndUpdate( {_id: id , user: req.user._id} ,req.body,{new : true})
    if(!review){
        return next(new AppError('Review not found or you are not authorized to perform this action',400))
    }
    res.status(200).json({message : "Review updated successfully",review})
})

const deleteReview = catchAsyncError(async (req,res,next) => {

    const {id} = req.params 

    let review = await reviewModel.findOneAndDelete(id)
    if(!review){
        return next(new AppError('Review not delete',400))
    }
    res.status(200).json({message : "Review deleted successfully",review})
})


export {addReview,getAllReviews,getReviewById,updateReview,deleteReview}