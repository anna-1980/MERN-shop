import express from 'express'
import {
  getProducts, 
  getProductById,
  deleteProduct,
  updateProduct,
  addNewProduct,
  createProductReview
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
 

const router = express.Router()

// description Fetch all products 
// @route GET/api/products
// @access public

router
.route('/')
.get(getProducts)
.post(protect, isAdmin, addNewProduct);
router.route('/:id/reviews').post(protect, createProductReview)
router
.route('/:id')
.get(getProductById)
.delete(protect, isAdmin, deleteProduct)
.put(protect, isAdmin, updateProduct)

export default router