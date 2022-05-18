const express = require('express');
const mongoose=require('mongoose');

const Db=require('./src/model/mongoose')


const app = express()
const port = 3000;



app.use(express.json())

   

app.post('/create-booking',async(req,res)=>{
    const db=new Db(req.body);
    console.log(req.body)

    try {
        const customer_info=await db.checkandInsertCustomer();
        const customer_id=customer_info._id;
        console.log(customer_id)

        const vehicle_id=await db.getVehicale_id(); 
        const booking=await db.create_booking(vehicle_id,customer_id);

        let BookingDetails={
            booking_id:booking._id,
            Fname:customer_info.Fname,
            Lname:customer_info.Lname,
            Phone:customer_info.Phone,
            EmailId:customer_info.EmailId,
            customer_id:customer_id,
           vehicle_id:booking.vehicle_id,
           From_address:booking.From_address,
           To_address:booking.To_address,
           passenger_count:booking.passenger_count,
           booking_date:booking.booking_date,
           booking_time:booking.booking_time

        }

        console.log(BookingDetails)
   res.status(201).send(BookingDetails)

        
    } catch (error) {
       res.status(500).send(error.message) 
    }





})

app.use('/update-booking',async(req,res)=>{

try {
  
    const db=new Db(req.body);
    const data=await db.update_booking();

    res.send(data)
} catch (error) {
    
}

})

app.get('/get-all-bookings',async(req,res)=>{
let query;
    if(Object.keys(req.query).length>0){
         query=req.query
         console.log(query)
    }else{
        query={}
    }
  
const bookings=await Db.getALlBookings(query)
res.status(201).send(bookings)

})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



