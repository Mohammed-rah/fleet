
const mongoose = require('mongoose')
const {Schema}=mongoose

const bookingSchema=new Schema( {
   vehicle_id:{
    type: Schema.Types.ObjectId,
    // required: true,
    trim: true,
    ref:"vehicle"
},
    customer_id: {
        type: Schema.Types.ObjectId,
        // required: true,
        trim: true,
        ref:'customer'
    },
    From_address: {
        type: String,
        // required: true,
        trim: true,
    },
    To_address: {
        type: String,
        // required: true,
        trim: true,
    },
    booking_date:{
        type: Date, default: Date.now

    },
    booking_time:{
        type: Date,
        // required: true,
         trim: true,
         default:Date.now
    },
    passenger_count:{
        type:Number
    }


    
},{ versionKey: false })

const bookings = mongoose.model('booking',bookingSchema)

module.exports = bookings