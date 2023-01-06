const express = require("express");
const router = express.Router();
const Coupon = require("../model/Coupon");
const Transaction = require("../model/Transaction");

//create new coupon code
router.post("/createcoupon", async (req, res) => {
  try {
    let code = "";
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let i = 0; i < 10; i++) {
      code += char[Math.floor(Math.random() * char.length)];
    }
    // console.log(code);
    // console.log(req.body.value);
    let coupon = await Coupon.create({ code: code, value: req.body.value });
    res.send(coupon);
  } catch (error) {
    res.send("Internal Server Error");
  }
});

//check coupon code
router.post("/checkcoupon", async (req, res) => {
  try {
    let coupon = await Coupon.findOne({ code: req.body.code });
    // console.log(req.body.code);
    // console.log(coupon);
    if (coupon) {
      if (coupon.isRedeemed) {
        return res
          .status(400)
          .send({
            status: false,
            message: "This coupon code is already redeemed",
          });
      } else {
        // const ucoupon = await Coupon.findOneAndUpdate({code:req.body.code},{$set:{isRedeemed:true,redeemedOn:Date.now()}});
        res.send({ status: true, message: "Coupon code is valid" });
      }
    } else {
      res.status(400).send({ status: false, message: "Invalid coupon code" });
    }
  } catch (error) {
    res.send({ status: false, message: "Internal server error" });
  }
});

//redeem coupon code
router.put("/redeemcoupon", async (req, res) => {
  try {
    let coupon = await Coupon.findOne({ code: req.body.code });
    // console.log(req.body.code);
    // console.log(coupon);
    if (coupon) {
      if (coupon.isRedeemed) {
        return res
          .status(400)
          .send({
            status: false,
            message: "This coupon code is already redeemed",
          });
      } else {
        const ucoupon = await Coupon.findOneAndUpdate(
          { code: req.body.code },
          {
            $set: {
              isRedeemed: true,
              redeemedBy: req.body.redeemedBy,
              redeemedOn: Date.now(),
            },
          }
        );
        res.send({ status: true, message: "Coupon code is redeemed",value:coupon.value });
      }
    } else {
      res.status(400).send({ status: false, message: "Invalid coupon code" });
    }
  } catch (error) {
    res.send({ status: false, message: "Internal server error" });
  }
});

//update transaction history
router.post("/updatetransaction", async (req, res) => {
  try {
    const transaction = await Transaction.create({
      couponCode: req.body.couponCode,
      address: req.body.address,
      amount: req.body.amount,
      time: Date.now(),
    });
    res.send(transaction);
  } catch (error) {
    res.send("Internal Server Error");
  }
});

//get transaction history
router.get("/gettransaction", async (req, res) => {
  try {
    const transaction = await Transaction.find();
    res.send(transaction);
  } catch (error) {
    res.send("Internal Server Error");
  }
});

module.exports = router;
