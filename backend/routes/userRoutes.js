import express from 'express';
import upload from '../config/multer.js';
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/',upload.single('profilePhoto'), registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect,protect,upload.single('profilePhoto'), updateUserProfile);





export default router;