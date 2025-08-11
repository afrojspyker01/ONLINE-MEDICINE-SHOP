const mongoose = require("mongoose");

const bookingschema = new mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    razorpay_order_id:String,
    razorpay_payment_id:String,
    status:{
        type:String,
        default:"pendding"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model("Booking",bookingschema);