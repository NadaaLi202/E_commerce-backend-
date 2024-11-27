
import express from "express";
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "./category.controller.js";
import subcategoryRouter from "../SubCategory/subcategory.router.js";
import { validation } from "../../middleware/validation.js";
import { addCategorySchema, deleteCategorySchema, getCategoryByIdSchema, updateCategorySchema } from "./category.validation.js";
import { fileUpload } from "../../middleware/fileUpload.js";

const categoryRouter = express.Router();

// categoryRouter.route('/').post(addCategory).get(getAllCategories) // use when the same path

categoryRouter.use('/:categoryId/subcategories',subcategoryRouter)
categoryRouter.post('/addCategory',fileUpload('image','category'),validation(addCategorySchema), addCategory)
categoryRouter.get('/', getAllCategories)
categoryRouter.get('/:id',validation(getCategoryByIdSchema),getCategoryById)
categoryRouter.put('/updateCategory/:id',fileUpload('image','category'),validation(updateCategorySchema),updateCategory)
categoryRouter.delete('/deleteCategory/:id',validation(deleteCategorySchema),deleteCategory)

export default categoryRouter;