import mongoose from 'mongoose';
import  bcript from 'bcryptjs';
import bcrypt from 'bcryptjs'; //to encrypt the password

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }

}, {
  timestamps: true,
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')){       ///check if the password already exists, otherwise it is passed throug hash again generate new one and we cannot login, checked through Mongoose isModified()
     next()         ///so if password is not been modified, added or sent we just move on , no hashing
  }
  //if the password has been modified, or sent then this runs:
  const salt = await bcrypt.genSalt(10)  //for hasching the password, hier 10 rounds async
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);

export default User;