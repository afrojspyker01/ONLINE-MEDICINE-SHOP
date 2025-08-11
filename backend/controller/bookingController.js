const razorpay = require('razorpay');
const Booking = require('../models/Booking');

exports.createorder = async(req,res)=>{
    const{city,user,amount} = req.body;
 
    try {
        const options = {
            amount:amount*100,
            currency:"INR",
            receipt:`rcpt_${Date.now()}`
        };
        const order = await razorpay.orders.create(options);
        const booking = new Booking({city,user,amount,razorpay_order_id:order.id});
        await booking.save();
        res.status(200).json({orderId:order.id, amount:order.amount,bookingId:booking._id});
    } catch (err) {
      res.status(400).json({message:'order create faild', error:err.message});

    }

};

exports.verifypayment = async(req,res)=>{
    const{razorpay_order_id,razorpay_payment_id,bookingId} = req.body;
 
    try {
        const booking = await Booking.findByIdAndUpdate(bookingId,{
            razorpay_payment_id,
            status:"paid"
        },{new:true});
        res.status(200).json({message:"payment verified",booking});
    } catch (err) {
      res.status(400).json({message:'verification failed', error:err.message});

    }

};