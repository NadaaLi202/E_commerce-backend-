import express from "express";
import { addReview, deleteReview, getAllReviews, getReviewById, updateReview } from "./review.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const reviewRouter = express.Router();


reviewRouter.post('/addReview',protectedRoutes,allowedTo('user'),addReview)
reviewRouter.get('/', getAllReviews)
reviewRouter.get('/:id',getReviewById)
reviewRouter.put('/updateReview/:id',protectedRoutes,allowedTo('user'),updateReview)
reviewRouter.delete('/deleteReview/:id',protectedRoutes,allowedTo('user','admin'),deleteReview)

export default reviewRouter;