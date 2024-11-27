import express from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCashOrder, addCheckOutSession, getAllOrders, getSpecificOrder } from "./order.controller.js";

const orderRouter = express.Router();


orderRouter.post('/:id',protectedRoutes,allowedTo('user'),addCashOrder) // cartId 
orderRouter.post('/checkout/:id',protectedRoutes,allowedTo('user','admin'),addCheckOutSession) // cartId 
orderRouter.get('/getAllOrders',protectedRoutes,allowedTo('user','admin'),getAllOrders) 
orderRouter.get('/',protectedRoutes,allowedTo('user','admin'),getSpecificOrder) 

// cartRouter.post('/',protectedRoutes,allowedTo('user','admin'),applyCoupon)
// cartRouter.get('/',protectedRoutes,allowedTo('user'),getLoggedUserCart)
// cartRouter.delete('/:id',protectedRoutes,allowedTo('user','admin'),removeFromCart) // itemCartId
// cartRouter.patch('/:id',protectedRoutes,allowedTo('user'),updateQuantityOfCart) // productId

export default orderRouter;