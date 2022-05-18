const mongoose = require('mongoose')
const {Schema}=require('mongoose')
const customerSchema=new Schema( {
    Fname: {
        type: String,
        required: true,
        trim: true
    },
    Lname: {
        type: String,
        required: true,
        trim: true
    },
    Phone:Number,

    EmailId:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    }
},{ versionKey: false })
const customer = mongoose.model('customer',customerSchema)

module.exports = customer