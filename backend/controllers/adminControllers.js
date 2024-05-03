import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateTokens.js';
import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';

import generateTokenadmin from '../utils/adminGeneratetoken.js';


// @desc Auth  admin/set token
// route POST /api/admin/authAdmin
// @access Public
const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
console.log(email,"hjghgfjhg");
    const admin = await Admin.findOne({ email });
 

    if (admin && (await admin.matchPassword(password))) {
        generateTokenadmin(res, admin._id,"adminjwt");
        res.status(201).json({
            _id: admin._id,
            email: admin.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

});

// @desc Logout user
// route POST /api/admin/logout
// @access Public
const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('adminjwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Admin logout out' });
});


//@desc  User data 
//route Get/api/admin/users
//@access Private
const findongUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({}).select("-password");
    res.json({users});
})


const deleteUserData = asyncHandler(async(req,res)=>{
    const userId = req.query.id;
    console.log(userId,"id");
    if (!userId) {
        res.status(400);
        throw new Error("Invalid user data")
    }

    const deletedUser=await User.findByIdAndDelete(userId);
    if(deletedUser){
        res.status(200).json({message:"User deletion successfull"})
    }else{
        res.status(400);
        throw new Error("Invalid user data")
    }
})

//@desc  Update User data Admin
//route PUT/api/admin/users/updateUser
//@access Private
const adminUpdateUser =asyncHandler(async (req,res)=>{
    console.log(req.body)
    const user=await User.findById(req.body.userId);
    if(user){
        user.name=req.body.updatedData.name ||user.name;
        user.email=req.body.updatedData.email||user.email;

        if(req.body.password){
            user.password=req.body.updatedData.password;
        }

        const updatedUser=await user.save();

        const response={
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
        };
        res.status(200).json(response)
    }else{
        res.status(404);
        throw new Error("user not found")
    }
});


// @desc    Add  a new user
// @route   POST /api/admin
// @access  Public
const addNewUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body;
  
    const profilePhoto=req.file.filename;
    
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
      profilePhoto
    });
  
    if (user) {
        generateTokenadmin(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto:user.profilePhoto
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });


export {
    authAdmin,
    logoutAdmin,
    findongUsers,
    deleteUserData,
    adminUpdateUser,
    addNewUser
};