import { cartModel } from "../../../dataBase/models/cart.model.js";
import { orderModel } from "../../../dataBase/models/order.model.js";
import { productModel } from "../../../dataBase/models/product.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51QPAZnHI65K9ju3WJANaJoyi2U7Ab8oJGWCDCfvlhSp53JKUwIodXhzNqINlOb9LMxm3yikujVGXVCzyLzqjwg1W006dXRWP4T');


const addCashOrder =  catchAsyncError(async(req,res,next) => {


    const cart = await cartModel.findById(req.params.id)

    const totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice

    const order = new orderModel({
        user: req.user._id,
        cartItems: cart.cartItems,
        totalOrderPrice,
        shoppingAddress:req.body.shoppingAddress,
    })
    await order.save()

   if(order) {
    let options = cart.cartItems.map(  item => ({
        updateOne : {
            filter: {_id : item.product },
            update: { $inc : { quantity: -item.quantity , soldCount : item.quantity}}
        }
    }))
    
    await productModel.bulkWrite(options)

    await cartModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({message: "Order created successfully",order})
   }else{
    return next(new AppError("Order not created", 404))
   }
})

const getAllOrders = catchAsyncError(async(req,res,next) => {

    let orders = await orderModel.find().populate('cartItems.product')

    res.status(200).json({message: "Done All Users Of Orders Successfully",orders})
    if(!orders){
        return next(new AppError("Don't find order of those users", 404))
    }
})

const getSpecificOrder = catchAsyncError(async(req,res,next) => {

    let order = await orderModel.findOne({user: req.user._id}).populate('cartItems.product')
    res.status(200).json({message: "Success, This is my order of you user",order})
    if(!order){
        return next(new AppError("Don't find order of this user", 404))
    }
})


const addCheckOutSession = catchAsyncError(async(req,res,next) => {

    const cart = await cartModel.findById(req.params.id)

    const totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice


let session = await stripe.checkout.sessions.create({

    line_items: [
        {
            price_data: {
                currency: 'egp',
                unit_amount: totalOrderPrice * 100,
                product_data: {
                    name : req.user.name
                }
            },
            quantity : 1
        }
    ],
    mode:'payment' ,
    success_url: 'https://ecommerce-com.netlify.app/#/', // took from frontend
    cancel_url: 'https://ecommerce-com.netlify.app/#/cart', //took  from frontend
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shoppingAddress
})

    res.status(200).json({message : "Session created successfully",session})
})

export {addCashOrder,getAllOrders,getSpecificOrder,addCheckOutSession}