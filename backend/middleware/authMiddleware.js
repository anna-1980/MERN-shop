import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler (async (req, res, next) => {  // you can add protect wherever you want to protect the route ( in controllers)

    let token
    // console.log(req.headers.authorization)

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        // console.log('Token found')
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // console.log(decoded)
            req.user = await User.findById(decoded.id).select('-password')
            // console.log(req.user)
            next()
        }catch (error) {
            console.error(error);
            res.status(401)
            throw new Error ('Not authorized, TOKEN has failed')
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorised, no token')
    }

    
})

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401)
        throw new Error ('Not authorised as an Admin')
    }
}

export {protect, isAdmin}