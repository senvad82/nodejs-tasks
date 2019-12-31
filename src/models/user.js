const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const usrSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true        
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0) throw new Error('Invalid age')

        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        //lowercase:true,
        validate(value){
            if(validator.isEmpty(value) || value.includes("password")){
                throw new Error('password is invalid')
            }
        }
    }
})

usrSchema.pre('save',async function(next){
    var user = this
    console.log('pre hook')
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }
    next()
})

var User = mongoose.model('User',usrSchema)

module.exports = User