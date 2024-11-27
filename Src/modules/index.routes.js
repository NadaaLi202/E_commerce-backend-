import { globalErrorMiddleware } from "../middleware/globalErrorMiddleware.js"
import { AppError } from "../utils/AppError.js"
import addressRouter from "./Addresses/address.router.js"
import authRouter from "./auth/auth.router.js"
import brandRouter from "./Brand/brand.router.js"
import cartRouter from "./Cart/cart.router.js"
import categoryRouter from "./Category/category.router.js"
import couponRouter from "./Coupon/coupon.router.js"
import orderRouter from "./Order/order.router.js"
import productRouter from "./Product/product.router.js"
import reviewRouter from "./Review/review.router.js"
import subcategoryRouter from "./SubCategory/subcategory.router.js"
import userRouter from "./User/user.router.js"
import wishlistRouter from "./WishList/wishList.router.js"


export function routes (app) {


app.use('/api/v1/categories',categoryRouter)
app.use('/api/v1/subcategories',subcategoryRouter)
app.use('/api/v1/brands',brandRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/reviews',reviewRouter)
app.use('/api/v1/wishlist',wishlistRouter)
app.use('/api/v1/address',addressRouter)
app.use('/api/v1/coupons',couponRouter)
app.use('/api/v1/carts',cartRouter)
app.use('/api/v1/orders',orderRouter)








app.use('*', (req,res,next) => {
    // res.status(404).json({message : 'Route not found'})
    next(new AppError(`Route ${req.originalUrl} not found`,404))
})
// global error handling middleware
app.use(globalErrorMiddleware)
}