import express from 'express'
import {
  authUser,
  registerUser,
  getUserProfile, 
  updateUserProfile, 
  getUsers,
  deleteUser, 
  getUserById, 
  updateUser
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
 

const router = express.Router()
 
router
.route('/')
.post(registerUser)
.get(protect, isAdmin, getUsers) //adding protected route middleware, AND isAdmin check
router.post('/login', authUser)
router
.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile)  // to implement middleware we just put it as a first argument

router
.route('/:id')
.delete(protect, isAdmin, deleteUser)
.get(protect, isAdmin, getUserById)
.put(protect, isAdmin, updateUser)

export default router