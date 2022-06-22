import path from 'path'; //---node.js module to work with file paths---//
import express from 'express';
import dotenv from 'dotenv';
import colors from "colors";
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import products from './data/products.js' ;

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is running...")
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

//-------make the uploads folder accessable we make it a static folder so it can get loaded in the browser-------//
//-------  __dirname is not available when you are using ES modules (only common JS) so to by pass it you create a variable-------//
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//custom from middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(` Server running in ${process.env.NODE_ENV} mode on port ${PORT}` .yellow.bold));
