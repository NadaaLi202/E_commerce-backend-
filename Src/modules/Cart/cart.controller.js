import { cartModel } from "../../../dataBase/models/cart.model.js";
import { couponModel } from "../../../dataBase/models/coupon.model.js";
import { productModel } from "../../../dataBase/models/product.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";


function calcTotalPrice (cart)  {

    let totalPrice = 0;
    cart.cartItems.forEach(ele => {
        totalPrice += ele.quantity * ele.price
    })
    cart.totalPrice = totalPrice

}

const addProductToCart = catchAsyncError(async(req,res,next) => {

    let product = await productModel.findById(req.body.product)
    if(!product)  return  next (new AppError('This product not founded',401))
    req.body.price = product.price

let isCartExisted = await cartModel.findOne({user: req.user._id})

    if (!isCartExisted){
        let cart = new cartModel({
            user: req.user._id,
            cartItems: [req.body],
        })
        calcTotalPrice(cart)
        await cart.save()
        res.status(200).json({message: 'Product added to cart successfully',cart})
    }

    let item = isCartExisted.cartItems.find((ele) => ele.product == req.body.product )
    if(item){
        item.quantity += req.body.quantity || 1
        // item.price = product.price * item.quantity

    }else {
        isCartExisted.cartItems.push(req.body)
    }
    calcTotalPrice(isCartExisted)
    if(isCartExisted.discount){
        isCartExisted.totalPriceAfterDiscount = isCartExisted.totalPrice - (isCartExisted.totalPrice * isCartExisted.discount) / 100
    }
    await isCartExisted.save()
    res.status(200).json({message: 'User already have a cart',isCartExisted})
})


const removeFromCart = catchAsyncError(async(req,res,next) => {

    let cart = await cartModel.
    findOneAndUpdate({user:req.user._id},{$pull: {cartItems:{_id: req.params.id}}}, {new: true})
    if(!cart){
        return next(new AppError('Product not remove to cart',400))
    }
    calcTotalPrice(cart)
    if(cart.discount){
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100
    }
    res.status(200).json({message: 'Product removed to cart successfully',cart})
})


const updateQuantityOfCart = catchAsyncError(async(req,res,next) => {
    

    let product = await productModel.findById(req.params.id)
    if(!product)  return  next (new AppError('This product not found',400))

        let isCartExisted = await cartModel.findOne( {user:req.user._id} )
        if(!isCartExisted)  return  next (new AppError('No cart found for this user',404))
        let item = isCartExisted.cartItems.find(ele => ele.product == req.params.id)
        if(item){
            item.quantity = req.body.quantity
        }else{
            return  next (new AppError('Item not found in cart',404))
        }
        calcTotalPrice(isCartExisted)
        if(isCartExisted.discount){
            isCartExisted.totalPriceAfterDiscount = isCartExisted.totalPrice - (isCartExisted.totalPrice * isCartExisted.discount) / 100
        }
        await isCartExisted.save()
    res.status(200).json({message: 'Item updated in cart successfully',cart: isCartExisted})
})


const applyCoupon = catchAsyncError(async(req,res,next) => {   // error

    let coupon = await couponModel.findOne({code: req.body.code , expireDate: {$gt: Date.now()} })
    if (!coupon) {
         return res.status(404).json({message: "Coupon not found or expired"})
    }
    let cart = await cartModel.findOne( {user: req.user._id} )
    if (!cart) {

     return res.status(404).json({message: "Cart not found",statusCode: 404})
    }
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.discount = coupon.discount
    await cart.save()
    res.status(200).json({message: "Done",cart})
})

const getLoggedUserCart = catchAsyncError(async(req,res,next) => {

    let cartItems = await cartModel.findOne({user: req.user._id}).populate('cartItems.product')
    res.status(200).json({message: "Done",cart: cartItems})

})

export {addProductToCart,removeFromCart,updateQuantityOfCart,applyCoupon,getLoggedUserCart}