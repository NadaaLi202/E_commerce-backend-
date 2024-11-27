import express from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCoupon, deleteCoupon, getAllCoupons, getCouponById, updateCoupon } from "./coupon.controller.js";

const couponRouter = express.Router();


couponRouter.post('/addCoupon',protectedRoutes,allowedTo('admin'),addCoupon)
couponRouter.get('/', getAllCoupons)
couponRouter.get('/:id',getCouponById)
couponRouter.put('/:id',protectedRoutes,allowedTo('admin'),updateCoupon)
couponRouter.delete('/:id',protectedRoutes,allowedTo('admin'),deleteCoupon)

export default couponRouter;