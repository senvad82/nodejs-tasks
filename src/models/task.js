const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var tskSchema = new mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})

var Task = mongoose.model('Task',tskSchema)

module.exports=Task