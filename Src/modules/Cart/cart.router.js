import express from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addProductToCart, applyCoupon, getLoggedUserCart, removeFromCart, updateQuantityOfCart } from "./cart.controller.js";

const cartRouter = express.Router();


cartRouter.post('/',protectedRoutes,allowedTo('user','admin'),addProductToCart)
cartRouter.post('/applyCoupon',protectedRoutes,allowedTo('user','admin'),applyCoupon)
cartRouter.get('/',protectedRoutes,allowedTo('user','admin'),getLoggedUserCart)
cartRouter.delete('/:id',protectedRoutes,allowedTo('user','admin'),removeFromCart) // itemCartId
cartRouter.patch('/:id',protectedRoutes,allowedTo('user','admin'),updateQuantityOfCart) // productId

export default cartRouter;