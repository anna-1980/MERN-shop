import bcrypt from 'bcryptjs'


const users = [
  {
    name: 'Admin User', 
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true 
  },
  {
    name: 'Jane Parker', 
    email: 'Jane@example.com',
    password: bcrypt.hashSync('123456', 10),
   
  },
  {
    name: 'Joe Any', 
    email: 'Joe@example.com',
    password: bcrypt.hashSync('123456', 10),
     
  }
]

export default users;