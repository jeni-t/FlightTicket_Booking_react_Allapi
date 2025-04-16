// import React, { useState } from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// const CheckoutForm = ({ bookingId }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("card"); // Default to card
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [bookingRef, setBookingRef] = useState("");


//   const handleBookingConfirmation = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/confirm-booking", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userEmail: email,
//           userPhone: phone,
//           bookingDetails: {
//             bookingReference: bookingId,
//             itinerary: "Flight XYZ123, Seat 12A", // Example data
//             amountPaid: "500",
//           },
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Booking confirmed! Email and SMS sent.");
//       } else {
//         alert("Error: " + data.error);
//       }
//     } catch (error) {
//       console.error("Booking confirmation failed:", error);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const response = await fetch("http://localhost:5000/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             amount: 5000,
//             currency: "usd",
//             paymentMethodType: [paymentMethod],
//             email,
//             phone,
//         }),
//     });

//     if (!bookingRef) {
//       console.error("❌ bookingRef is missing");
//       return;
//     }

//     const data = await response.json();
//     if (!data.clientSecret) {
//         alert("Error creating payment intent. Check backend logs.");
//         setLoading(false);
//         return;
//     }

//     const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: { card: elements.getElement(CardElement) },
//     });

//     if (result.error) {
//         alert(result.error.message);
//     } else {
//         alert("Payment successful!");

//         const bookingDetails = {
//             bookingId,
//             flightId: "FL123",
//             seat: "12A",
//             price: "500",
//             paymentMethod,
//         };

//         // ✅ Send booking confirmation email & SMS
//         const confirmResponse = await fetch("http://localhost:5000/confirm-booking", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 userEmail: email,
//                 userPhone: phone,
//                 bookingDetails: {
//                   bookingId: bookingRef, // Ensure this is defined
//                   flightId,
//                   departure,
//                   arrival,
//                   seat,
//                   price,
//                   paymentMethod: "Stripe"
//                 }
//             }),
//         });

//         const confirmData = await confirmResponse.json();
//         if (!confirmResponse.ok) {
//             alert(`Error: ${confirmData.error}`);
//         } else {
//             alert("✅ Booking confirmation sent via Email & SMS!");
//         }
//     }

//     setLoading(false);
// };


//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Email:</label>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         placeholder="Enter your email"
//       />

//       <label>Mobile Number:</label>
//       <input
//         type="tel"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         required
//         placeholder="Enter your mobile number"
//       />

//       <label>Select Payment Method:</label>
//       <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//         <option value="card">Credit/Debit Card</option>
//         <option value="paypal">PayPal</option>
//         <option value="ach_transfer">Bank Transfer</option>
//         <option value="google_pay">Google Pay</option>
//         <option value="apple_pay">Apple Pay</option>
//       </select>

//       {paymentMethod === "card" && <CardElement />}

//       <button type="submit" disabled={!stripe || loading}>
//         Pay
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;


import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default to card
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      alert("Stripe is not properly initialized.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Step 1: Create Payment Intent
      const response = await fetch("https://flightticket-booking-node-allapi.onrender.com/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 5000, // Example amount in cents
          currency: "usd",
          payment_method_types: [paymentMethod], // Fixed key name
          email,
          phone,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.clientSecret) {
        throw new Error(data.error || "Payment Intent creation failed.");
      }

      // ✅ Step 2: Confirm Payment
      let paymentResult;
      if (paymentMethod === "card") {
        const cardElement = elements.getElement(CardElement);
        paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: { card: cardElement },
        });
      } else {
        alert("Currently, only card payments are supported.");
        setLoading(false);
        return;
      }

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      // ✅ Step 3: Confirm Booking
      const bookingResponse = await fetch("https://flightticket-booking-node-allapi.onrender.com/confirm-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: email,
          userPhone: phone,
        //  bookingDetails: {
            bookingId, // Correct reference
            flightId: "FL123",
            seat: "12A",
            price: "500",
            paymentMethod: "Stripe",
          //},
        }),
      });

      const bookingData = await bookingResponse.json();
      if (!bookingResponse.ok) {
        throw new Error(bookingData.error || "Booking confirmation failed.");
      }

      alert("✅ Payment successful! Booking confirmed. Email & SMS sent.");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-blue-200 rounded-2xl shadow-2xl space-y-8">
    <div className="text-center text-2xl font-semibold text-blue-800">Secure Payment</div>
  
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Enter your mobile number (+91)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="card">Credit/Debit Card</option>
        </select>
      </div>
  
      {paymentMethod === "card" && (
        <div className="p-4 bg-white rounded-lg shadow-inner border border-gray-200">
          <CardElement />
        </div>
      )}
  
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white text-lg transition transform duration-200 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-800 to-blue-300 hover:scale-105 hover:opacity-90"
        }`}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  </div>
  
  );
};

export default CheckoutForm;
