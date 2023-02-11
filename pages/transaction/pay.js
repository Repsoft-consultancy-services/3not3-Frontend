import React, { useState } from "react";
import Script from "next/script";
const axios = require("axios");

var options = {
  key: "rzp_test_cn1haWMs39nSVt", // Enter the Key ID generated from the Dashboard
  amount: "500", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: "INR",
  name: "3Not3",
  description: "Add Money",
  image:
    "https://next.razorpay.com/build/browser/static/razorpay-logo-white.c637804f.svg",
  order_id: "",
  // callback_url: "http://localhost:3000/",
  prefill: {
    name: "Gaurav Kumar",
    email: "gaurav.kumar@example.com",
    contact: "9999999999",
  },
  notes: {
    address: "Razorpay Corporate Office",
  },
  theme: {
    color: "#171730",
  },
};

const Pay = () => {
  const [state, setState] = useState({
    amount: Number,
    currency: "INR",
    receipt: "Receipt",
    notes: "Notes",
  });

  const createOrder = async () => {
    return axios.post("/payments/createOrder", state);
  };

  const handleOnPay = async () => {
    const order = await createOrder();
    console.log({ order });
    options.order_id = order.data.id;
    options.amount = order.data.amount;
    console.log({ options });
    const rzrp = new window.Razorpay(options);
    rzrp.open();
  };

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <input
        type="text"
        value={state.amount}
        onChange={(e) => setState({ ...state, amount: e.target.value })}
      />
      <button onClick={handleOnPay}>Pay Now</button>
    </div>
  );
};

export default Pay;
