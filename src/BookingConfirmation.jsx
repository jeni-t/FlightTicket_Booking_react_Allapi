import { useNavigate } from "react-router-dom";

function BookingConfirmation({ clientSecret, bookingId }) {
  const navigate = useNavigate();

  const handlePaymentRedirect = () => {
    navigate(`/payment?clientSecret=${encodeURIComponent(clientSecret)}&bookingId=${encodeURIComponent(bookingId)}`);
  };

  return <button onClick={handlePaymentRedirect}>Proceed to Payment</button>;
}
