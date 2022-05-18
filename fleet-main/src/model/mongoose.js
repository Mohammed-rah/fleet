const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Fleet')


const vehicle=require("../collection/vehicle")
const customer=require("../collection/customer")
const bookings=require("../collection/bookings")




class Db{
constructor(requestDataObj){
this.requestData=requestDataObj
}

async checkandInsertCustomer(){
  let er;
  try {
    const EmailId=this.requestData.EmailId;
  const checkCustomer= await customer.findOne({"EmailId":EmailId});
if(checkCustomer!=null){
  return checkCustomer
}else{
  let myCxData={
    Fname:this.requestData.Fname,
  Lname:this.requestData.Lname,
  EmailId:this.requestData.EmailId,
  Phone:this.requestData.Phone
}
  const insertCustomer= await customer.create(myCxData);
return insertCustomer
}
  } catch (error) {
    er=error.message
  }
return er
}


async getVehicale_id(){
  let er;
  const vehicle_type=this.requestData.vehicle_type;
  try {
    const vehicle_id=await vehicle.findOne({"Type":vehicle_type});
    return vehicle_id._id;
  } catch (error) {
    er=error.message
  }
  return er;
}


async create_booking(vehicle_id,customer_id){
    let erMsg=""
  try{
    const bookingData={
      
      vehicle_id:vehicle_id,
      customer_id:customer_id,
      From_address:this.requestData.From_address,
      To_address:this.requestData.To_address,
      passenger_count:this.requestData.passenger_count
    }
    const booking=await bookings.create(bookingData);
    return booking
  } catch(e){
    erMsg=e
  } 
  return {message:erMsg,er:1}
}

async update_booking(){
    
  try {
    //Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)
    
    //step1 : update cx collection
      const updates=Object.keys(this.requestData)
    const updatesAllowed=["Fname","Lname","Phone"];
    //extracting all the keys related to cx to update them
const getCustomerInfoUpdateKey=updates.filter((data)=>updatesAllowed.includes(data))

let updateObject=getCustomerInfoUpdateKey.reduce((cur,prev)=>{
 
  cur[prev]=this.requestData[prev];
return cur
},{})



   const update_customer=await customer.findOneAndUpdate({"EmailId":this.requestData.EmailId},updateObject,{returnDocument: 'after'});


    console.log(update_customer)
    const updatesAllowedforBoking=["From_address","To_address","booking_date","passenger_count","booking_time"];
    //extracting all the keys related to cx to update them
const getBookingInfoUpdateKey=updates.filter((data)=>updatesAllowedforBoking.includes(data))

let updateObjectBooking=getBookingInfoUpdateKey.reduce((cur,prev)=>{
 
  cur[prev]=this.requestData[prev];
return cur
},{})
   
    const update_bookings=await bookings.update({"Customer_id":update_customer._id},updateObjectBooking)
    console.log(update_bookings)
    return "data updated"

  } catch (error) {
    console.log(error)
  }

}

static  async getALlBookings(query){
  try {
    console.log(query)
    const getallbookings=await bookings.find(query);

   return getallbookings

  } catch (error) {
    
  }
}


}

module.exports=Db
