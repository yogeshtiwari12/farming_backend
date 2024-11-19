import express from 'express';
const router = express.Router();
import {signup,login, logout, profile} from '../methods/methods.js';
import verifytoken from '../jwt.js';




router.put('/signup',signup);
router.post('/login',login);
router.post('/logout',verifytoken,logout);
router.get('/profile',verifytoken,profile);

export default router;