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
    
    const user = await User.findById(req.user._id);

    if(user){
     //will be returned for the logged in user
        res.json({      
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin, 
        })

    }else{
        res.status(404);
        throw new Error('User not found')
    }

    // res.send('Sucess')
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

// Register a new user
// @route POST/api/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email: email})
    
    if(userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        name, 
        email, 
        password,
    })

    if(user){
        res.status(201).json({
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin, 
            token: generateToken(user._id)
        }) 

    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})


const updateUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id);

    if(user){
     //will be returned for the logged in user
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            isAdmin: updatedUser.isAdmin, 
            token: generateToken(updatedUser._id)
        })

    }else{
        res.status(404);
        throw new Error('User not found')
    }
})

// description  GET all Users
// @route GET/api/users 
// @access PRIVATE/Admin only

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users)
})

// description  DELETE a User
// @route DELETE/api/users/:id
// @access PRIVATE/Admin only

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        await user.remove()
        res.json({ message: 'User account deleted'})
    }else{
        res.status(404);
        throw new Error('User NOT found')
    }
})

// description  GET User by ID
// @route GET/api/users/:id
// @access PRIVATE/Admin only

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.json(user)
    }else{
        res.status(404);
        throw new Error('User NOT found')
    }
})

//@description Admin update User
// @route PUT/api/users/:id
// @access PRIVATE/Admin only

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            isAdmin: updatedUser.isAdmin,
        })

    }else{
        res.status(404);
        throw new Error('User not found')
    }
})

export {
    authUser,
    getUserProfile, 
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById, 
    updateUser,
}