import express from 'express'
import {
  getProducts, 
  getProductById
} from '../controllers/productController.js' 
 

const router = express.Router()

// description Fetch all products 
// @route GET/api/products
// @access public

// router.get('/', 
   
//  )
router.route('/').get(getProducts);
router.route('/:id').get(getProductById)

export default router