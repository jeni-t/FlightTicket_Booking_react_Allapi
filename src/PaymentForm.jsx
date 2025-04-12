// import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { useSearchParams } from "react-router-dom";
// import CheckoutForm from "./CheckoutForm"; // ✅ Only importing, not redefining
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// const stripePromise = loadStripe("pk_test_51R10Ho06LkHADKb61Fv2EeBhzwqsxG2cx8Pl7YgCwOwPkf0XApZv4wNM2FM5UmBJaU6EQwQhNi9zI8jiIk4uE8hU00lyVJozWc"); 
// import axios from "axios";


// const PaymentPage = () => {
//   const [searchParams] = useSearchParams();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const clientSecret = searchParams.get("clientSecret");
//   const bookingId = searchParams.get("bookingId");
//   const [options, setOptions] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (clientSecret) {
//       setOptions({
//         clientSecret,
//         appearance: { theme: "stripe" },
//       });
//     }
//   }, [clientSecret]);

//   return (
//     <Elements stripe={stripePromise} options={{ clientSecret }}>
//         <CheckoutForm bookingId={bookingId} />
//     </Elements>
// );
// }

// const CheckoutForms = ({ bookingId }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [message, setMessage] = useState("");

//     const handlePayment = async (event) => {
//         event.preventDefault();
//         setIsProcessing(true);

//         if (!stripe || !elements) {
//             return;
//         }

//         const { error, paymentIntent } = await stripe.confirmPayment({
//             elements,
//             confirmParams: { return_url: window.location.origin },
//             redirect: "if_required"
//         });

//         if (error) {
//             setMessage(`Payment failed: ${error.message}`);
//             setIsProcessing(false);
//         } else if (paymentIntent?.status === "succeeded") {
//             setMessage("✅ Payment successful!");

//             // 🔹 Confirm payment in backend
//             await axios.post("http://localhost:5000/api/payments/confirm", {
//                 paymentIntentId: paymentIntent.id
//             });

//             setTimeout(() => {
//                 window.location.href = `/bookings?success=true&bookingId=${bookingId}`;
//             }, 2000); // Redirect after 2 seconds
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//             <h2 className="text-2xl font-bold mb-4">Secure Payment</h2>
//             {message && <p className="text-green-500">{message}</p>}
//             <form onSubmit={handlePayment}>
//                 <PaymentElement />
//                 <button
//                     type="submit"
//                     disabled={!stripe || isProcessing}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
//                 >
//                     {isProcessing ? "Processing..." : "Pay Now"}
//                 </button>
//             </form>
//         </div>
//     );
// };
// export default PaymentPage;


// PaymentPage.jsx
// import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

// const stripePromise = loadStripe("pk_test_51R10Ho06LkHADKb61Fv2EeBhzwqsxG2cx8Pl7YgCwOwPkf0XApZv4wNM2FM5UmBJaU6EQwQhNi9zI8jiIk4uE8hU00lyVJozWc");

// const PaymentPage = () => {
//   const [searchParams] = useSearchParams();
//   const clientSecret = searchParams.get("clientSecret");
//   const bookingId = searchParams.get("bookingId");
//   const [options, setOptions] = useState(null);

//   useEffect(() => {
//     if (clientSecret) {
//       setOptions({
//         clientSecret,
//         appearance: {
//           theme: "flat",
//         },
//         // 🔥 This is the key part
//         layout: "tabs",
//         defaultValues: {
//           billingDetails: {
//             address: {
//               postal_code: "12345", // optional if collected from UI
//             },
//           },
//         },
//       });
//     }
//   }, [clientSecret]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center">
//       <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md shadow-xl p-8 rounded-2xl border border-blue-200">
//         <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Secure Payment</h1>
//         {options && (
//           <Elements stripe={stripePromise} options={options}>
//             <CheckoutForm bookingId={bookingId} />
//           </Elements>
//         )}
//       </div>
//     </div>
//   );
// };

// const CheckoutForm = ({ bookingId }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [message, setMessage] = useState("");

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     if (!stripe || !elements) return;

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: window.location.origin,
//       },
//       redirect: "if_required",
//     });

//     if (error) {
//       setMessage(`❌ Payment failed: ${error.message}`);
//     } else if (paymentIntent?.status === "succeeded") {
//       setMessage("✅ Payment successful! Redirecting...");
//       await axios.post("http://localhost:5000/api/payments/confirm", {
//         paymentIntentId: paymentIntent.id,
//       });
//       setTimeout(() => {
//         window.location.href = `/bookings?success=true&bookingId=${bookingId}`;
//       }, 2000);
//     }

//     setIsProcessing(false);
//   };

//   return (
//     <form onSubmit={handlePayment} className="space-y-4">
//       <PaymentElement options={{ fields: { billingDetails: 'auto' } }} />
//       {message && <div className="text-center text-sm font-medium text-red-600">{message}</div>}
//       <button
//         type="submit"
//         disabled={!stripe || isProcessing}
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg"
//       >
//         {isProcessing ? "Processing..." : "Pay Now"}
//       </button>
//     </form>
//   );
// };

// export default PaymentPage;

// PaymentPage.jsx


// import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

// const stripePromise = loadStripe(
//   "pk_test_51R10Ho06LkHADKb61Fv2EeBhzwqsxG2cx8Pl7YgCwOwPkf0XApZv4wNM2FM5UmBJaU6EQwQhNi9zI8jiIk4uE8hU00lyVJozWc"
// );

// const PaymentPage = () => {
//   const [searchParams] = useSearchParams();
//   const clientSecret = searchParams.get("clientSecret");
//   const bookingId = searchParams.get("bookingId");
//   const [options, setOptions] = useState(null);

//   useEffect(() => {
//     if (clientSecret) {
//       setOptions({
//         clientSecret,
//         appearance: {
//           theme: "flat",
//           labels: "floating",
//           variables: {
//             colorPrimary: "#0A2540",
//             borderRadius: "8px",
//             fontFamily: "Poppins, sans-serif",
//           },
//         },
//       });
//     }
//   }, [clientSecret]);

//   return (
//     <div>
//      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center">
//        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-2xl p-8 rounded-2xl border border-blue-200">
//          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
//            Secure Payment
//          </h1>
//         {options && (
//           <Elements stripe={stripePromise} options={options}>
//             <CheckoutForm bookingId={bookingId} />
//           </Elements>
//         )}
//        </div>
//      </div>
//     </div>
//   );
// };

// const CheckoutForm = ({ bookingId }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [message, setMessage] = useState("");

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     if (!stripe || !elements) {
//       setMessage("Stripe has not loaded yet.");
//       setIsProcessing(false);
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${window.location.origin}/bookings?success=true&bookingId=${bookingId}`,
//       },
//       redirect: "if_required",
//     });

//     if (error) {
//       setMessage(`❌ Payment failed: ${error.message}`);
//     } else if (paymentIntent?.status === "succeeded") {
//       setMessage("✅ Payment successful! Redirecting...");
//       try {
//         await axios.post("http://localhost:5000/api/payments/confirm", {
//           paymentIntentId: paymentIntent.id,
//         });
//       } catch (err) {
//         console.error("Error confirming payment on server:", err);
//       }

//       setTimeout(() => {
//         window.location.href = `/bookings?success=true&bookingId=${bookingId}`;
//       }, 2000);
//     }

//     setIsProcessing(false);
//   };

//   return (
//     <form onSubmit={handlePayment} className="space-y-6">
//       <PaymentElement />
//       {message && (
//         <div className="text-center text-sm font-medium text-red-600">
//           {message}
//         </div>
//       )}
//       <button
//         type="submit"
//         disabled={!stripe || isProcessing}
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
//       >
//         {isProcessing ? "Processing..." : "Pay Now"}
//       </button>
//     </form>
//   );
// };

// export default PaymentPage;



// import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const stripePromise = loadStripe("pk_test_51R10Ho06LkHADKb61Fv2EeBhzwqsxG2cx8Pl7YgCwOwPkf0XApZv4wNM2FM5UmBJaU6EQwQhNi9zI8jiIk4uE8hU00lyVJozWc");

// const PaymentPage = () => {
//   const [searchParams] = useSearchParams();
//   const location = useLocation();
//   const clientSecret = searchParams.get("clientSecret");
//   const bookingId = searchParams.get("bookingId");
//   const [options, setOptions] = useState(null);

//   useEffect(() => {
//     if (clientSecret) {
//       setOptions({
//         clientSecret,
//         appearance: { theme: "flat" },
//       });
//     }
//   }, [clientSecret]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4">
//       {options && (
//         <Elements stripe={stripePromise} options={options}>
//           <CheckoutForm bookingId={bookingId} />
//         </Elements>
//       )}
//     </div>
//   );
// };

// const CheckoutForm = ({ bookingId }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [message, setMessage] = useState("");

//   const handlePayment = async (event) => {
//     event.preventDefault();
//     setIsProcessing(true);
//     setMessage("");

//     if (!stripe || !elements) return;

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: { return_url: window.location.origin },
//       redirect: "if_required",
//     });

//     if (error) {
//       setMessage(`❌ ${error.message}`);
//       setIsProcessing(false);
//     } else if (paymentIntent?.status === "succeeded") {
//       setMessage("✅ Payment successful!");

//       await axios.post("http://localhost:5000/api/payments/confirm", {
//         paymentIntentId: paymentIntent.id,
//       });

//       setTimeout(() => {
//         window.location.href = `/bookings?success=true&bookingId=${bookingId}`;
//       }, 2000);
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
//       <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
//         Complete Your Payment
//       </h2>

//       {message && (
//         <div
//           className={`text-center mb-4 text-sm ${
//             message.includes("❌") ? "text-red-500" : "text-green-600"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handlePayment}>
//         <div className="mb-6">
//           <PaymentElement />
//         </div>

//         <button
//           type="submit"
//           disabled={!stripe || isProcessing}
//           className={`w-full py-3 text-white rounded-lg font-semibold transition duration-200 ${
//             isProcessing
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {isProcessing ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;



// import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import { useSearchParams, useLocation } from "react-router-dom";
// import axios from "axios";

// const stripePromise = loadStripe("pk_test_51R10Ho06LkHADKb61Fv2EeBhzwqsxG2cx8Pl7YgCwOwPkf0XApZv4wNM2FM5UmBJaU6EQwQhNi9zI8jiIk4uE8hU00lyVJozWc");

// const PaymentPage = () => {
//   const [searchParams] = useSearchParams();
//   const location = useLocation();
//   const clientSecret = searchParams.get("clientSecret");
//   const bookingId = searchParams.get("bookingId");
//   const [options, setOptions] = useState(null);

//   useEffect(() => {
//     if (clientSecret) {
//       setOptions({
//         clientSecret,
//         appearance: {
//           theme: "flat",
//           labels: "floating",
//         },
//       });
//     }
//   }, [clientSecret]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4">
//       {options && (
//         <Elements stripe={stripePromise} options={options}>
//           <CheckoutForm bookingId={bookingId} />
//         </Elements>
//       )}
//     </div>
//   );
// };

// const CheckoutForm = ({ bookingId }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [message, setMessage] = useState("");

//   const handlePayment = async (event) => {
//     event.preventDefault();
//     setIsProcessing(true);
//     setMessage("");

//     if (!stripe || !elements) return;

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: { return_url: window.location.origin },
//       redirect: "if_required",
//     });

//     if (error) {
//       setMessage(`❌ ${error.message}`);
//       setIsProcessing(false);
//     } else if (paymentIntent?.status === "succeeded") {
//       setMessage("✅ Payment successful!");

//       await axios.post("http://localhost:5000/api/payments/confirm", {
//         paymentIntentId: paymentIntent.id,
//       });

//       setTimeout(() => {
//         window.location.href = `/bookings?success=true&bookingId=${bookingId}`;
//       }, 2000);
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
//       <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
//         💳 Secure Payment
//       </h2>

//       {message && (
//         <div
//           className={`text-center mb-4 text-sm ${
//             message.includes("❌") ? "text-red-500" : "text-green-600"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handlePayment}>
//         <div className="mb-6">
//           <PaymentElement />
//         </div>

//         <button
//           type="submit"
//           disabled={!stripe || isProcessing}
//           className={`w-full py-3 text-white rounded-lg font-semibold transition duration-200 ${
//             isProcessing
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {isProcessing ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;


import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import CheckoutForm from "./CheckoutForm"; // ✅ Only importing, not redefining

const stripePromise = loadStripe(
  "pk_test_51R10Ho06LkHADKb61Fv2EeBhzwqsxG2cx8Pl7YgCwOwPkf0XApZv4wNM2FM5UmBJaU6EQwQhNi9zI8jiIk4uE8hU00lyVJozWc"
);

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const clientSecret = searchParams.get("clientSecret");
  const bookingId = searchParams.get("bookingId");
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (clientSecret) {
      setOptions({
        clientSecret,
        appearance: {
          theme: "flat",
          labels: "floating",
        },
      });
    }
  }, [clientSecret]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      {options && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm bookingId={bookingId} />
        </Elements>
      )}
    </div>
  );
};

const CheckoutForms = ({ bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setMessage("");

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setMessage(`❌ ${error.message}`);
      setIsProcessing(false);
    } else if (paymentIntent?.status === "succeeded") {
      setMessage("✅ Payment successful!");

      await axios.post("https://flightticket-booking-node-allapi.onrender.com/api/payments/confirm", {
        paymentIntentId: paymentIntent.id,
      });

      setTimeout(() => {
        window.location.href = `/bookings?success=true&bookingId=${bookingId}`;
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
        Complete Your Payment
      </h2>

      {message && (
        <div
          className={`text-center mb-4 text-sm ${
            message.includes("❌") ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handlePayment}>
        <div className="mb-6">
          <PaymentElement />
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-3 text-white rounded-lg font-semibold transition duration-200 ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 hover:scale-105"
          }`}
        >
          {isProcessing ? "Processing..." : "💳 Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
