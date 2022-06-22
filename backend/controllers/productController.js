import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// description Fetch all products 
// @route GET/api/products
// @access public

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
   
    res.json(products)
})

// description Fetch all products 
// @route GET/api/products
// @access public

const getProductById = asyncHandler(async (req, res) => {
    const product =  await Product.findById(req.params.id)

    if (product){
      res.json(product)
    }else{
      res.status(404)
      throw new Error('Product not found')
    }
  
    // console.log(req.params.id);
})

// description DELETE a product 
// @route DELETE/api/products/:id
// @access Private and Admin Only

const deleteProduct = asyncHandler(async (req, res) => {
  const product =  await Product.findById(req.params.id)
  if (product){
    await product.remove()
    res.json({message: 'Product removed'})
  }else{
    res.status(404)
    throw new Error('Product not found')
  }
})

// description CREATE a product 
// @route POST/api/products/ 
// @access Private and Admin Only

const addNewProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'new Product Name',
    price: 0,
    user: req.user._id,
    image:'/images/sample.jpeg',
    brand: 'product brand',
    category: 'product category',
    countInStock: 0,
    numReviews: 0, 
    description: 'product description'
  })
//-------sending the newly created product back-------//
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
  
})

// description UPDATE a product 
// @route PUT/api/products/:id 
// @access Private and Admin Only

const updateProduct = asyncHandler(async (req, res) => {
  const {name, price, description, image, brand, category, countInStock} = req.body
 
  const product = await Product.findById(req.params.id) //because the id is in the url
  if(product){
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  }else{
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
    getProducts, 
    getProductById, 
    deleteProduct,
    addNewProduct,
    updateProduct  
}