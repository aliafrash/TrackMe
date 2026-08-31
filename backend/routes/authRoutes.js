import express from 'express';
import {
  registerUser,
  loginUser,
  getUserInfo,
  updateProfile,
  changePassword,
  uploadImage,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload-image', upload.single('image'), uploadImage);

// Protected Routes
router.get('/getUser', protect, getUserInfo);
router.put('/update-profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

export default router;
