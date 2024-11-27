import express from "express";
import { addUser, changeUserPassword, deleteUser, getAllUsers, getUserById, updateUser } from "./user.controller.js";


const userRouter = express.Router();

userRouter.post('/addUser',addUser)
userRouter.get('/',getAllUsers)
userRouter.get('/:id',getUserById)
userRouter.put('/updateUser/:id',updateUser)
userRouter.patch('/:id',changeUserPassword)
userRouter.delete('/deleteUser/:id',deleteUser)


export default userRouter;