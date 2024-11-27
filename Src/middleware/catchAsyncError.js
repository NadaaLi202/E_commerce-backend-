

export const catchAsyncError = (fn) => {

    return (req, res, next) => {
        fn(req,res,next).catch((err) => {
            // res.status(400).json({message : err.message})
            next(err)
        })
    }
}