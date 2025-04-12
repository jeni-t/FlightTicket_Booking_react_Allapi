import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingHistory = ({ userId }) => {
    const [bookings, setBookings] = useState([]); // Default to an empty array
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("👤 UserId passed to BookingHistory:", userId); // Add this line
    
        const fetchBookingHistory = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/bookings/history/${userId}`);
                if (Array.isArray(res.data)) {
                    setBookings(res.data);
                } else {
                    setBookings([]);
                }
            } catch (err) {
                console.error("❌ Error fetching booking history:", err);
                setError("Failed to load booking history");
            }
        };
    
        if (userId) fetchBookingHistory();
    }, [userId]);
    

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

   return (
  <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <h1 className="text-xl font-bold">Booking History</h1>
    <p>🧪 Debug info:</p>
    <p>userId: {userId || "Not passed"}</p>
    <p>Bookings: {JSON.stringify(bookings)}</p>
  </div>
);
};

export default BookingHistory;
