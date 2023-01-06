import React, { useState, useEffect } from "react";
const validator = require("validator");

export default function Coupon(props) {
  const APIURI="https://fourhs-coupon-api.onrender.com";
  const [redeemCode, setRedeemCode] = useState("");
  const [transaction, setTransaction] = useState([""]);

  useEffect(() => {
    getTransaction();
  }, []);

  const timeFormater = (time) => {
    let date = new Date(time);
    return date.toLocaleString();
  };

  const handleCode = async () => {
    const address = document.getElementById("address").value;
    if (validator.isEthereumAddress(address) === true) {
      if (redeemCode.length === 10) {
        const coupon = await checkCoupon(redeemCode);
        if (coupon.status === true) {
          const redeem = await redeemCoupon(redeemCode, address);
          if (redeem.status === true) {
            props.showAlert(redeem.message, "success");
            await updateTransaction(redeemCode, address, redeem.value);
          } else {
            props.showAlert(redeem.message, "danger");
          }
        } else {
          props.showAlert(coupon.message, "danger");
        }
      } else {
        props.showAlert("Invalid Coupon Code", "danger");
      }
    } else {
      props.showAlert("Enter a valid address", "danger");
    }
    // props.showAlert(`Redeem code generated`,"success");
  };

  const checkCoupon = async (code) => {
    const response = await fetch(`${APIURI}/api/auth/checkcoupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  };

  const redeemCoupon = async (code, redeemedBy) => {
    const response = await fetch(
      `${APIURI}/api/auth/redeemcoupon`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, redeemedBy }),
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  };

  const updateTransaction = async (couponCode, address, amount) => {
    const response = await fetch(
      `${APIURI}/api/auth/updatetransaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ couponCode, address, amount }),
      }
    );

    const data = await response.json();
    console.log(data);
  };

  const getTransaction = async () => {
    const response = await fetch(
      `${APIURI}/api/auth/gettransaction`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
    setTransaction(data.reverse());
  };

  const onChange = (e) => {
    setRedeemCode(e.target.value.toUpperCase());
  };
  return (
    <div className="mainBox">
      <div className="nav">
        <img id="logo" src="4hs_logo.png" alt="4hs" />
        <span>4HS - Coupon Hub</span>
      </div>
      <div className="codeInput">
        <label htmlFor="">Enter Coupon Code:</label>
        <input
          type="text"
          id="redeemcode"
          placeholder="eg: ABCDE1FG2H"
          onChange={onChange}
          value={redeemCode}
        />
        <label htmlFor="">Enter Token Address:</label>
        <input
          type="text"
          id="address"
          placeholder="eg: 0x0000000000000000000000000000000000000000"
        />
        <button className="btn" onClick={handleCode}>
          Submit
        </button>
      </div>

      <div className="nav2">Payment History</div>
      <div className="paymentHistory">
        <div className="paymentHistoryHeading">
          <span>Coupon Code</span>
          <span>Coupon Amount</span>
          <span>Redeemed By</span>
          <span>Redeemed On</span>
        </div>

        {(transaction[0]!=="") && transaction.map((element) => {
          return (
            <div className="paymentHistoryItem" key={element._id}>
              <span>{element.couponCode}</span>
              <span>{element.amount}</span>
              <span>{element.address}</span>
              <span>{timeFormater(element.time)}</span>
            </div>
          );
        })}

      </div>

        <div className="footer">

        <a href="https://discord.gg/vJJH8HR3QW" target={"_blank"} rel="noreferrer"><i class="fa-brands fa-discord"></i></a>

        <a href="https://instagram.com/4huntersesports?igshid=YmMyMTA2M2Y=" target={"_blank"} rel="noreferrer"><i class="fa-brands fa-instagram"></i></a>

        <a href="https://youtube.com/@4huntersesports" target={"_blank"} rel="noreferrer"><i class="fa-brands fa-youtube"></i></a>

        <a href="https://chat.whatsapp.com/Gh5AcdZPu7W274Qe4Tr54I" target={"_blank"} rel="noreferrer"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
    </div>
  );
}
