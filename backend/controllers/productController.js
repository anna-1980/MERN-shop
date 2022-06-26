import asyncHandler from 'express-async-handler'
import products from '../data/products.js'
import Product from '../models/productModel.js'

// description Fetch all products 
// @route GET/api/products
// @access public

const getProducts = asyncHandler(async (req, res) => {
//-------PAGINATION--------------------------------------//
const pageSize = 4;
const currentPage = Number() 
//-------if including the search keyword, see if this is empty and we get all the products or we get only keyword matching the product(s)-------//
//-----req.query. is how you get the query strings, 
//-----if there is a ? in the url this is how you get whatever is after, 
//-----in this case searchKeyword from const { data } = await axios.get( `/api/products?searchKeyword=${paramsKeyword}`) in ProductActions-------//
  const keyword = req.query.searchKeyword ? {
    name: {
      //regular expression//
      $regex: req.query.searchKeyword, //partial match is enough
      $options: 'i', //makes it key insensitive
    }
  } : {}
    const products = await Product.find({...keyword})
   
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

// description create a new review
// @route POST/api/products/:id/reviews
// @access Private 
const createProductReview = asyncHandler(async (req, res) => {
  const {rating, comment} = req.body
 
  const product = await Product.findById(req.params.id) //because the id is in the url
  if(product){
  //-------will return true if review already was made by that user on that product-------/
    const alreadyReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    if(alreadyReviewed) {
      res.status(400)
      throw new Error('You already reviewed this product')
    }
    const review = {
      name: req.user.name, 
      rating: Number(rating),
      comment,
      user: req.user._id
    }
//-------creating logic for adding new review and calculating the average review-------//
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    //------- saving product reviews details to DB-------//
    await product.save()
    res.status(201).json({message: 'Review added'})

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
    updateProduct,
    createProductReview
}