import express from "express";
import { addBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "./brand.controller.js";
import { validation } from "../../middleware/validation.js";
import { addBrandSchema, deleteBrandSchema, getBrandByIdSchema, updateBrandSchema } from "./brand.validation.js";
import { fileUpload } from "../../middleware/fileUpload.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";


const brandRouter = express.Router();

brandRouter.post('/addBrand',protectedRoutes,allowedTo('admin'),fileUpload('logo','brand'),validation(addBrandSchema),addBrand)
brandRouter.get('/',getAllBrands)
brandRouter.get('/:id',validation(getBrandByIdSchema),getBrandById)
brandRouter.put('/updateBrand/:id',protectedRoutes,allowedTo('admin'),fileUpload('logo','brand'),validation(updateBrandSchema),updateBrand)
brandRouter.delete('/deleteBrand/:id',protectedRoutes,allowedTo('admin'),validation(deleteBrandSchema),deleteBrand)


export default brandRouter;