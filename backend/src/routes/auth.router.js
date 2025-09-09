import express from 'express'
import { login, logout, signUp,me ,googleLogin,sendOtp,verifyOtp} from '../controllers/auth.controller.js';
 const router=express.Router();

 router.post('/signup',signUp);
 router.post('/login',login);
 router.post('/logout',logout);
 router.get('/me',me)
 
router.post('/google', googleLogin);


router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

 export default router;