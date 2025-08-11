const mongoose = require("mongoose");

const clientschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    sector:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    image:{
        type:String

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model("Client",clientschema);