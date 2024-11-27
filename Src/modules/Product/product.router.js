import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "./product.controller.js";
import { fileUploadMultiple } from "../../middleware/fileUpload.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

let fieldsArray = [{name : 'images',maxCount : 10},{name :'imageCover',maxCount : 1}]
const productRouter = express.Router();


productRouter.post('/addProduct',protectedRoutes,allowedTo('admin'),fileUploadMultiple(fieldsArray,'product'), addProduct)
productRouter.get('/', getAllProducts)
productRouter.get('/:id',getProductById)
productRouter.put('/updateProduct/:id',protectedRoutes,allowedTo('admin'),updateProduct)
productRouter.delete('/deleteProduct/:id',protectedRoutes,allowedTo('admin'),deleteProduct)

export default productRouter;