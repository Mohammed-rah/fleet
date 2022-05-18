const mongoose = require('mongoose')
const {Schema}=require('mongoose');
const vehicleSchema=new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    Type: {
        type: String,
        required: true,
        trim: true,
    }
    
},{ versionKey: false })
const vehicle = mongoose.model('vehicle',vehicleSchema
 )

module.exports = vehicle