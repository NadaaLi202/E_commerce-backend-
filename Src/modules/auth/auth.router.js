import express from "express";
import { signIn, signup } from "./auth.controller.js";


const authRouter = express.Router();

authRouter.post('/signup',signup) // register
authRouter.post('/signIn',signIn) // login


export default authRouter;