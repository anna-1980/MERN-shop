import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// description  Auth user and get a Token
// @route POST/api/users/login
// @access public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email: email})
    
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin, 
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }

})

// description  GET user profile
// @route GET/api/users/profile
// @access PRIVATE

const getUserProfile = asyncHandler(async (req, res) => {
    
    res.send('Sucess')
    // const user = await User.findById({ email: email})
    
    // if(user && (await user.matchPassword(password))){
    //     res.json({
    //         _id: user._id, 
    //         name: user.name, 
    //         email: user.email, 
    //         isAdmin: user.isAdmin, 
    //         token: generateToken(user._id)
    //     })
    // }else{
    //     res.status(401)
    //     throw new Error('Invalid email or password')
    // }

})

export {
    authUser,
    getUserProfile
}