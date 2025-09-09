import express from 'express'
import passport from 'passport'
import { 
  login, 
  logout, 
  signUp,
  me,
  sendOtp,
  verifyOtp
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', me);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleLogin);

// OTP auth
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

export default router;
