const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  couponCode:{
    type:String,
  },
  address: {
    type: String,
  },
  amount:{
    type:Number,
  },
  time:{
    type:Date,
  }
});

module.exports = mongoose.model('transaction',transactionSchema);