import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// description Create New Order 
// @route POST/api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
     const { 
         orderItems, 
         shippingAddress, 
         paymentMethod, 
         itemsPrice, 
         taxPrice, 
         shippingPrice, 
         totalPrice} = req.body;
if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No ordered items');
    return
} else {
    const order = new Order({
         user: req.user._id, 
         orderItems, 
         shippingAddress, 
         paymentMethod, 
         itemsPrice, 
         taxPrice, 
         shippingPrice, 
         totalPrice
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
}})

// description get ORDER by ID 
// @route GET/api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email') // because User is tederred to the order so you can pull data of the user who placed the order   

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error ('Order not found')
    }

})

export { addOrderItems, getOrderById };