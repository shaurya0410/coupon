const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema({
code:{
    type:String
},
value:{
    type:Number
},
isRedeemed:{
    type:Boolean,
    default:false
},
redeemedBy:{
    type:String
},
redeemedOn:{
    type:Date
},
timeStamp:{
    type:Date,
    default:Date.now
}
});

module.exports = mongoose.model("coupon",couponSchema);