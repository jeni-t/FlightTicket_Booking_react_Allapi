// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// //import StripeCheckout from "react-stripe-checkout";
// import { useNavigate, useLocation } from "react-router-dom";
// import FlightStatus from "./FlightStatus";


// const BookingManagement = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const success = queryParams.get("success");
//     const bookingId = queryParams.get("bookingId"); 


//     // Fetch bookings from API
//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 console.log("Fetching bookings..."); // Debug log
    
//                 const response = await axios.get("http://localhost:5000/api/bookings");
//                 console.log("API Response:", response.data); // Log API response
    
//                 if (response.data && response.data.length > 0) {
//                     setBookings(response.data);
//                 } else {
//                     console.warn("No bookings found!");
//                 }
//             } catch (error) {
//                 console.error("❌ Error fetching bookings:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         fetchBookings();
//     }, []);
    
    


//     // Cancel a booking
//     const cancelBooking = async (bookingId) => {
//         if (!bookingId) {
//             console.error("❌ Booking ID is undefined. Cannot cancel.");
//             alert("Error: Booking ID is missing.");
//             return;
//         }
    
//         try {
//             const response = await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
//             if (response.status === 200) {
//                 setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== bookingId));
//                 alert("✅ Booking canceled successfully!");
//             } else {
//                 throw new Error(`Unexpected response: ${response.status}`);
//             }
//         } catch (error) {
//             console.error("❌ Error canceling booking:", error);
//             alert("Failed to cancel booking. Please try again.");
//         }
//     };
    
    
    
    

//      // ✅ Function to download PDF
//      const handleDownloadPDF = async (bookingId) => {
//         const element = document.getElementById(`booking-${bookingId}`);
    
//         if (!element) {
//             console.error(`❌ Booking element not found for ID: ${bookingId}`);
//             return;
//         }
    
//         try {
//             // ✅ Create a hidden style element to override OKLCH colors
//             const style = document.createElement("style");
//             style.innerHTML = `
//                 * { color: black !important; background: white !important; }
//             `;
//             document.head.appendChild(style); // Apply temporary styles
    
//             // ✅ Convert to canvas
//             const canvas = await html2canvas(element, {
//                 backgroundColor: "#ffffff",  // Force white background
//                 scale: 2,  // Improve resolution
//                 useCORS: true  // Prevent cross-origin issues
//             });
    
//             document.head.removeChild(style); // Remove temporary styles
    
//             const imgData = canvas.toDataURL("image/png");
//             const pdf = new jsPDF("p", "mm", "a4");
//             const imgWidth = 190;
//             const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
//             pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//             pdf.save(`Booking_${bookingId}.pdf`);
//         } catch (error) {
//             console.error("❌ Error generating PDF:", error);
//         }
//     };
    
    

//   // ✅ Function to print booking confirmation
//   const printBooking = (booking) => {
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(`
//       <html>
//       <head><title>Booking Confirmation</title></head>
//       <body>
//         <h2>Booking Confirmation</h2>
//         <p><strong>Reference:</strong> ${booking.reference}</p>
//         <p><strong>Flight Number:</strong> ${booking.flightNumber}</p>
//         <p><strong>Passenger:</strong> ${booking.passengerName}</p>
//         <p><strong>Seat Number:</strong> ${booking.seatNumber}</p>
//         <p><strong>Departure:</strong> ${booking.departure} at ${booking.departureTime}</p>
//         <p><strong>Arrival:</strong> ${booking.arrival} at ${booking.arrivalTime}</p>
//         <p><strong>Status:</strong> ${booking.status}</p>
//         <button onclick="window.print()">Print</button>
//       </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   const handleConfirmBooking = async (bookingId, amount) => {
//     if (!bookingId) {
//         alert("Error: Missing booking ID.");
//         return;
//     }

//     try {
//         // 🔹 Call backend to create a PaymentIntent
//         const response = await axios.post("http://localhost:5000/api/payments/create", { 
//             bookingId, 
//             amount, 
//             currency: "usd" // Change currency if needed
//         });

//         const clientSecret = response.data.clientSecret;
//         if (clientSecret && bookingId) {
//             navigate(`/payment?clientSecret=${clientSecret}&bookingId=${bookingId}`);
//         } else {
//             alert("Error: Payment initialization failed.");
//         }
//     } catch (error) {
//         console.error("❌ Error processing payment:", error);
//         alert("Failed to initiate payment. Please try again.");
//     }
// };



//     if (loading) return <p>Loading bookings...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//             {success && (
//             <p className="bg-green-200 text-green-800 p-3 rounded mb-4">
//                 ✅ Payment successful for Booking ID: {bookingId}
//             </p>
//         )}
//         <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
//             {bookings.length === 0 ? (
//                 <p>No bookings found.</p>
//             ) : (
//                 bookings.map((booking,index) => (
//                     <div key={booking._id || index} id={`booking-${booking._id}`} className="p-4 border mb-4">
//                     <li>
//                         <strong>Booking Reference:</strong> {booking.bookingReference} <br />
//                         <strong>Flight:</strong> {booking.flightNumber} <br />
//                         <strong>Passenger:</strong> {booking.passengerName} <br />
//                         <strong>Status:</strong> {booking.status} <br />
//                     </li>
//                         <button 
//     className="bg-red-500 text-white px-4 py-2 rounded mt-2"
//     onClick={() => cancelBooking(booking._id)} // Ensure `_id` is used
// >
//     Cancel Booking
// </button>

//                         <div className="mt-4 flex gap-2">
//                         <button onClick={() => handleDownloadPDF(booking._id)} className="p-2 bg-blue-500 text-white rounded">
//     Download PDF
// </button>
//             <button onClick={() => printBooking(booking)} className="p-2 bg-green-500 text-white rounded">Print</button>

//           </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default BookingManagement;



import React, { useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate, useLocation } from "react-router-dom";
import FlightStatus from "./FlightStatus";

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingBooking, setEditingBooking] = useState(null); // Track specific booking ID
const [updatedDetails, setUpdatedDetails] = useState({ passengerName: "", seatNumber: "" });


    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get("success");
    const bookingId = queryParams.get("bookingId");

    // Fetch bookings from API
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("https://flightticket-booking-node-allapi.onrender.com/api/bookings");
                if (response.data.length > 0) {
                    setBookings(response.data);
                }
            } catch (error) {
                console.error("❌ Error fetching bookings:", error);
                setError("Failed to load bookings.");
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    // Cancel a booking
    const cancelBooking = async (bookingId) => {
        if (!bookingId) return alert("Error: Booking ID is missing.");
        try {
            await axios.delete(`https://flightticket-booking-node-allapi.onrender.com/api/bookings/${bookingId}`);
            setBookings(bookings.filter(booking => booking._id !== bookingId));
            alert("✅ Booking canceled successfully!");
        } catch (error) {
            console.error("❌ Error canceling booking:", error);
            alert("Failed to cancel booking.");
        }
    };

    const handleEditBooking = (booking) => {
        setEditingBooking(booking._id);  // Store only the selected booking ID
        setUpdatedDetails({ 
            passengerName: booking.passengerName, 
            seatNumber: booking.seatNumber 
        });
    };
    
    

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDetails((prev) => ({ ...prev, [name]: value }));
    };

    // Update booking
    const updateBooking = async (bookingId) => {
        try {
            await axios.put(`https://flightticket-booking-node-allapi.onrender.com/api/bookings/${bookingId}`, updatedDetails);
            setEditingBooking(null); // Close the edit form
            alert("✅ Booking updated successfully!");
            window.location.reload(); // Refresh to show updated booking
        } catch (error) {
            console.error("❌ Error updating booking:", error);
            alert("Failed to update booking. Please try again.");
        }
    };
    

    // Download PDF
    const handleDownloadPDF = async (bookingId) => {
        const original = document.getElementById(`booking-${bookingId}`);
        if (!original) return;
      
        // Clone the node to override styles
        const clone = original.cloneNode(true);
      
        // ✅ Clean inline style to override problematic styles
        clone.style.backgroundColor = "#ffffff";
        clone.style.color = "#000000";
        clone.style.padding = "20px";
        clone.style.fontFamily = "Arial, sans-serif";
      
        // Remove all computed styles that might use oklch
        const all = clone.getElementsByTagName("*");
        for (let i = 0; i < all.length; i++) {
          all[i].style.backgroundColor = "#ffffff";
          all[i].style.color = "#000000";
          all[i].style.borderColor = "#000000";
        }
      
        // Create a container div (not attached to layout) for rendering
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.left = "-9999px";
        container.appendChild(clone);
        document.body.appendChild(container);
      
        try {
          const canvas = await html2canvas(clone);
          const imgData = canvas.toDataURL("image/png");
      
          const pdf = new jsPDF();
          const width = pdf.internal.pageSize.getWidth();
          const height = (canvas.height * width) / canvas.width;
      
          pdf.addImage(imgData, "PNG", 0, 0, width, height);
          pdf.save(`booking-${bookingId}.pdf`);
        } catch (error) {
          console.error("❌ Error generating PDF:", error);
        }
      
        // Clean up the temporary element
        document.body.removeChild(container);
      };

    // Print booking confirmation
    const printBooking = (booking) => {
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
            <head><title>Booking Confirmation</title></head>
            <body style="font-family: Arial, sans-serif;">
                <h2 style="color: #007bff;">Booking Confirmation</h2>
                <p><strong>Reference:</strong> ${booking.bookingReference}</p>
                <p><strong>Flight:</strong> ${booking.flightNumber}</p>
                <p><strong>Passenger:</strong> ${booking.passengerName}</p>
                <p><strong>Departure:</strong> ${booking.departure}</p>
                <p><strong>Arrival:</strong> ${booking.arrival}</p>
                <p><strong>Status:</strong> ${booking.status}</p>
                <button onclick="window.print()">Print</button>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <div className="relative min-h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20230706/pngtree-d-illustration-of-airline-booking-app-for-buying-tickets-or-checking-image_3792552.jpg')" }}>
            <div className="absolute inset-0 bg-opacity-50"></div>

            <div className="relative max-w-xl w-full mx-auto p-6 bg-opacity-20 shadow-lg rounded-lg mt-10 z-10">
                {success && (
                    <p className="bg-green-200 text-green-800 p-3 rounded mb-4">
                        ✅ Payment successful for Booking ID: {bookingId}
                    </p>
                )}
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Your Bookings</h2>

                {loading && <p className="text-center">Loading bookings...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {bookings.length === 0 ? (
                    <p className="text-center text-gray-700">No bookings found.</p>
                ) : (
                    bookings.map((booking, index) => (
                        <div key={booking._id || index}  id={`booking-${booking._id}`}
                        
                        // style={{ backgroundImage: "url('/booking.jpg')" }}
>
    <div className="bg-gradient-to-br from-blue-100">
                            <p className="py-6 text-2xl"><strong><center>Booking Reference:</center></strong> {booking.bookingReference}</p>
                            <p className="px-6 text-lg"><strong>Flight:</strong> {booking.flightNumber}</p>
                            <p className="px-6 text-lg"><strong>Passenger:</strong> {booking.passengerName}</p>
                            <p className="px-6 text-lg"><strong>Seat:</strong> {booking.seatNumber}</p>
                            <p className="px-6 text-lg"><strong>Departure:</strong> {booking.departure}</p>
                            <p className="px-6 text-lg"><strong>Arrival:</strong> {booking.arrival}</p>
                            <p className="px-6 text-lg"><strong>Status:</strong> <span className={`font-bold ${booking.status === "Confirmed" ? "text-green-600" : "text-red-600"}`}>{booking.status}</span></p>
</div>
                            <div className="mt-4 flex gap-3">
                           

                            </div>

                            {/* {bookings.map((booking) => ( */}
    <div key={booking._id} className="p-4 border mb-4 bg-white shadow rounded">
        {editingBooking === booking._id ? (  // ✅ Only show form for the selected booking
            <div className="bg-gray-100 p-4 rounded">
                <h2 className="text-lg font-bold">Update Booking</h2>

                <label className="block mb-2">Passenger Name</label>
                <input
                    type="text"
                    name="passengerName"
                    value={updatedDetails.passengerName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mb-3"
                />

                <label className="block mb-2">Seat Number</label>
                <input
                    type="text"
                    name="seatNumber"
                    value={updatedDetails.seatNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mb-3"
                />

                <div className="flex justify-between">
                    <button onClick={() => updateBooking(booking._id)} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Save
                    </button>
                    <button onClick={() => setEditingBooking(null)} className="bg-gray-400 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        ) : (
            // ✅ Show booking details when NOT editing
            <div>
                <p><strong>Passenger:</strong> {booking.passengerName}</p>
                <p><strong>Seat:</strong> {booking.seatNumber}</p>
               
            </div>
        )}
    </div>
{/* ))} */}

                            <div className="mt-4 flex gap-3">
                            <button 
    onClick={() => handleEditBooking(booking)}
    className="bg-blue-900 text-white px-4 py-2 rounded">
    Update Booking
</button>
                                <button onClick={() => cancelBooking(booking._id)} className="px-4 py-2 bg-blue-900 text-white rounded shadow-md hover:bg-red-700 transition">
                                    Cancel Booking
                                </button>
                                <button onClick={() => handleDownloadPDF(booking._id)} className="px-4 py-2 bg-blue-900 text-white rounded shadow-md hover:bg-blue-700 transition">
                                    Download PDF
                                </button>
                                <button onClick={() => printBooking(booking)} className="px-4 py-2 bg-blue-900 text-white rounded shadow-md hover:bg-green-700 transition">
                                    Print
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BookingManagement;
