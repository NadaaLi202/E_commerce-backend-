import express from "express"
import * as subcategory from "./subcategory.controller.js"

const subcategoryRouter = express.Router({mergeParams : true})



subcategoryRouter.post('/addSubcategory',subcategory.addSubcategory)
subcategoryRouter.get('/',subcategory.getAllSubcategories)
subcategoryRouter.get('/:id',subcategory.getSubcategoryById)
subcategoryRouter.put('/updateSubcategory/:id',subcategory.updateSubcategory)
subcategoryRouter.delete('/deleteSubcategory/:id',subcategory.deleteSubcategory)


export default subcategoryRouter;