import express from 'express';
import upload from '../config/multer.js';
const router = express.Router();
import {
    authAdmin,
    logoutAdmin,
    findongUsers,
    deleteUserData,
    adminUpdateUser,
    addNewUser
} from '../controllers/adminControllers.js';


import { adminProtect } from '../middleware/adminMiddlewate.js';



router.post('/adminAuth', authAdmin);
router.post('/logout',logoutAdmin);
router.get('/users',adminProtect,findongUsers);
router.delete('/users/delete',adminProtect,deleteUserData);
router.put('/users/updateUser',adminProtect,adminUpdateUser);
router.post('/addUser',upload.single('profilePhoto'),addNewUser)






export default router;