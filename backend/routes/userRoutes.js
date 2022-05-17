import express from 'express'
import {
  authUser,
  getUserProfile 
} from '../controllers/userController.js' 
 

const router = express.Router()
 
 
router.post('/login', authUser)
router.route('/profile', authUser).get(getUserProfile)

export default router