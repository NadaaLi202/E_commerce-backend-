import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";


export const deleteOne = (model) => {

    return  catchAsyncError(async (req,res,next) => {

        const {id} = req.params;
    
        let category = await model.findByIdAndDelete(id)
    
        if (!category) {
         return next (new AppError('Document not deleted',400))
    }
    res.status(200).json({message : 'Document deleted successfully',category})
    })
}