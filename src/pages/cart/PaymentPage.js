import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../components/cart/PaymentForm";
import StripeContainer from "../../components/cart/StripeContainer";

function PaymentPage() {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="PaymentPage">
      <h1>Basketball Fashion</h1>
      {showItem ? (
        <StripeContainer />
      ) : (
        <>
          <h3>$10.00</h3>{" "}
          <img
            src="http://sc04.alicdn.com/kf/H6c90d253386a4d08a0f4b96b462b6cefh.jpg"
            alt="sumting"
            style={{ maxWidth: "300px", marginLeft: "120px" }}
          />
          <button onClick={() => setShowItem(true)}>
            Purchase Jerseys Button
          </button>
        </>
      )}
    </div>
  );
}

export default PaymentPage;
