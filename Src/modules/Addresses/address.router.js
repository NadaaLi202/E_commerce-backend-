import express from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addAddress, getAllUserToAddress, removeAddress } from "./address.controller.js";


const addressRouter = express.Router();

addressRouter.get('/',protectedRoutes,allowedTo('user'),getAllUserToAddress)
addressRouter.patch('/',protectedRoutes,allowedTo('user'),addAddress)
addressRouter.delete('/',protectedRoutes,allowedTo('user'),removeAddress)


export default addressRouter;