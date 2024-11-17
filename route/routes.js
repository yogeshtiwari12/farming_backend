import express from 'express';
const router = express.Router();
import {signup,login, logout} from '../methods/methods.js';
import verifytoken from '../jwt.js';




router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',verifytoken,logout);

export default router;