import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';


const adminProtect =  asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.adminjwt;

    if (token) {
        console.log(token);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await Admin.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});
export {adminProtect};