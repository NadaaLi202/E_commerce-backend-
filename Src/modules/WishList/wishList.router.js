import express from "express";
import { removeFromWishList, addToWishList, getAllUserToWishList,  } from "./wishList.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";


const wishlistRouter = express.Router();

wishlistRouter.get('/',protectedRoutes,allowedTo('user'),getAllUserToWishList)
wishlistRouter .patch('/',protectedRoutes,allowedTo('user'),addToWishList)
wishlistRouter.delete('/',protectedRoutes,allowedTo('user'),removeFromWishList)


export default wishlistRouter;