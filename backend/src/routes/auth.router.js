import express from 'express'
import passport from 'passport'
import { 
  login, 
  logout, 
  signUp,
  me,
  
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout',protectRoute, logout);
router.get('/me',protectRoute, me);


export default router;
