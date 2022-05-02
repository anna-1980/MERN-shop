import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';

// VERY careful using this script, it will trplace EVERYTHING in your database with the stuff below!!!

dotenv.config();

connectDB();

const importData = async () => {
  try {

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers [0]._id

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser}
    })

    await Product.insertMany(sampleProducts)

    console.log('Data imported'.green.inverse)
    process.exit()

  }catch (error){
      console.error(`${error}`.red.inverse)
      process.exit(1)
  }
}

const destroytData = async () => {
  try {

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
 

    console.log('Data destroyed'.red.inverse)
    process.exit()

  }catch (error){
      console.error(`${error}`.red.inverse)
      process.exit(1)
  }
}

if (process.argv[2] === '-d'){
  destroytData()
}else{
  importData()
}

// to call this you need to type int he console
//node backend/seeder 
// to destroy data you need :  node backend/seeder -d 

//also set a script in json file: 