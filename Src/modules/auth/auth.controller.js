import { userModel } from "../../../dataBase/models/user.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";




const signup = catchAsyncError( async (req,res,next) => {

    let isUserExist = await userModel.findOne({email : req.body.email})

    if (isUserExist) {
        return next(new AppError('User already exist',409))
    }
    let user = new userModel(req.body)
    await user.save()
    res.status(200).json({message : 'User added successfully',user})
})


const signIn = catchAsyncError (async (req,res,next) => {

    const {email,password} = req.body;
    let isUserExist = await userModel.findOne({email})
    const match = await bcrypt.compare(password,isUserExist.password)

    if(isUserExist && match) {
        let token = jwt.sign({name : isUserExist.name ,userId : isUserExist._id, role : isUserExist.role},'mysecretkey')
        res.status(200).json({message : 'User login successfully',isUserExist,token})
    }
    next (new AppError('invalid email or password',404))

})


const protectedRoutes = catchAsyncError(async (req,res,next) => { // authentication 

    let {token} = req.headers
    if(!token)  return next (new AppError('Token not provided',401))


    let decoded = await jwt.verify(token,'mysecretkey')
    // console.log(decoded)

    let user = await userModel.findById(decoded.userId)
    if(!user)  return next (new AppError('User not existed or invalid token',401))

        if(user.passwordChangedAt){

            let changePasswordDate = parseInt(user.passwordChangedAt.getTime() / 1000)
            console.log(changePasswordDate,"====",decoded.iat)
        
            if(changePasswordDate > decoded.iat) return next (new AppError('password changed',401))
        }
        
        req.user = user
        next()
})


const allowedTo = (...roles) => { // Authorization  ..  want to admin only to add product

    return catchAsyncError(async(req,res,next) => {

        if (!roles.includes(req.user.role))
            return next(new AppError('you are not authorized to access this route . you are ' + req.user.role ,401))

        next()
    })

}

export {signup,signIn,protectedRoutes,allowedTo}