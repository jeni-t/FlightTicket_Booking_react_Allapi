// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function FlightSearch() {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [date, setDate] = useState("");
//   const [adults, setAdults] = useState(1);
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [sortedFlights, setSortedFlights] = useState([]);
//   const [selectedFlight, setSelectedFlight] = useState(null);
//   const [passengers, setPassengers] = useState([{ firstName: "", lastName: "", dateOfBirth: "" }]);
//   const [seatPreference, setSeatPreference] = useState("Window");
//   const [bookingSuccess, setBookingSuccess] = useState(null);
//   const [error, setError] = useState("");
//   const [travelClass, setTravelClass] = useState("Any");
//   const [departureDate, setDepartureDate] = useState("");
//   const [originQuery, setOriginQuery] = useState("");
//   const [destinationQuery, setDestinationQuery] = useState("");
//   const [originSuggestions, setOriginSuggestions] = useState([]);
//   const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (flights.length > 0) {
//       const sorted = [...flights].sort((a, b) =>
//         sortOrder === "asc"
//           ? parseFloat(a.price.total) - parseFloat(b.price.total)
//           : parseFloat(b.price.total) - parseFloat(a.price.total)
//       );
//       setSortedFlights(sorted);
//     }
//   }, [sortOrder, flights]);

//   // ✅ FIXED: Updated API endpoint
// //   const searchFlights = async () => {
// //     try {
// //         const response = await axios.get("http://localhost:5000/api/airlines/flights", {
// //             params: { origin: "JFK", destination: "LAX", date: "2025-04-05", adults, travelClass},
// //         });

// //         setFlights(response.data);
// //     } catch (error) {
// //         console.error("Error fetching flights:", error);
// //     }
// // };

// const searchFlights = async () => {
//   try {
//     const params = {
//       origin,
//       destination,
//       date: departureDate,
//       adults,
//       currencyCode: "USD"
//     };
//     if (travelClass !== "Any") {
//       params.travelClass = travelClass;
//     }

//     const response = await axios.get("https://flightticket-booking-node-allapi.onrender.com/api/airlines/flights", {
//       params
//     });

//     setFlights(response.data);
//   } catch (error) {
//     console.error("Error fetching flights:", error.response?.data || error.message);
//   }
// };


//   const handlePayment = async () => {
//     try {
//       const amount = parseFloat(selectedFlight.price.total) * 100;

//       const response = await axios.post("https://flightticket-booking-node-allapi.onrender.com/api/payment/stripe", {
//         amount,
//         currency: "USD",
//         email: "user@example.com",
//         flightDetails: {
//           flightNumber: selectedFlight.id,
//           passengerName: `${passengers[0].firstName} ${passengers[0].lastName}`,
//           seatNumber: seatPreference,
//           departure: selectedFlight.itineraries[0].segments[0].departure.iataCode,
//           departureTime: selectedFlight.itineraries[0].segments[0].departure.at,
//           arrival: selectedFlight.itineraries[0].segments[0].arrival.iataCode,
//           arrivalTime: selectedFlight.itineraries[0].segments[0].arrival.at,
//         }
//       });

//       navigate(`/payment?clientSecret=${response.data.clientSecret}&bookingId=${response.data.bookingId}`);
//     } catch (error) {
//       console.error("Payment error:", error.response?.data || error.message);
//     }
//   };

//   const handleBooking = async () => {
//     try {
//       const response = await axios.post("https://flightticket-booking-node-allapi.onrender.com/api/book-flight", {
//         flightNumber: selectedFlight.id,
//         passengerName: `${passengers[0].firstName} ${passengers[0].lastName}`, // ✅ Fixed passengerName format
//         seatNumber: seatPreference,
//         departure: selectedFlight.itineraries[0].segments[0].departure.iataCode,
//         departureTime: selectedFlight.itineraries[0].segments[0].departure.at,
//         arrival: selectedFlight.itineraries[0].segments[0].arrival.iataCode,
//         arrivalTime: selectedFlight.itineraries[0].segments[0].arrival.at,
//         status: "CONFIRMED",
//       });

//       setBookingSuccess(response.data.message);
//       setSelectedFlight(null);
//     } catch (error) {
//       console.error("Booking error:", error.response?.data || error.message);
//     }
//   };

  
//   const fetchFlights = async () => {
//     try {
//         const response = await axios.get("https://flightticket-booking-node-allapi.onrender.com/api/flights", {
//             params: { origin, destination, date }
//         });
//         setFlights(response.data);
//     } catch (error) {
//         console.error("Error fetching flights:", error.response?.data || error.message);
//     }
// };

// useEffect(() => {
//   axios.get("https://flightticket-booking-node-allapi.onrender.com/api/flights") // ✅ Ensure correct API URL
//       .then(response => {
//           console.log("Flights Data:", response.data); // ✅ Debugging output
//           setFlights(response.data);
//       })
//       .catch(error => {
//           console.error("Error fetching flights:", error);
//       });
// }, []);

// useEffect(() => {
//   if (originQuery.length > 2) {
//     axios.get(`https://flightticket-booking-node-allapi.onrender.com/api/airports?query=${originQuery}`)
//       .then(res => setOriginSuggestions(res.data))
//       .catch(err => console.error("Origin airport error", err));
//   }
// }, [originQuery]);

// useEffect(() => {
//   if (destinationQuery.length > 2) {
//     axios.get(`https://flightticket-booking-node-allapi.onrender.com/api/airports?query=${destinationQuery}`)
//       .then(res => setDestinationSuggestions(res.data))
//       .catch(err => console.error("Destination airport error", err));
//   }
// }, [destinationQuery]);

// // Handle suggestion click
// const handleSelectOrigin = (code) => {
//   setOrigin(code);
//   setOriginQuery(""); // optional: clear
//   setOriginSuggestions([]);
// };

//   return (
//     <div>
//        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://blog.air.irctc.co.in/wp-content/uploads/2021/03/flight-ticket-fare.jpg')"}}>
//       <div className="absolute inset-0 bg-blak bg-opacity-40">
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
//         <div className="bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-2xl">
//           <h2 className="text-center text-xl font-bold text-gray-900 mb-4">Search Flights</h2>
//           <div className="grid grid-cols-2 gap-4">
//           <input
//   type="text"
//   className="p-2 border-2"
//   placeholder="From"
//   value={originQuery}
//   onChange={(e) => {
//     setOriginQuery(e.target.value);
//     // fetch originSuggestions here
//   }}
// />
// <ul>
//   {originSuggestions.map((airport) => (
//     <li
//       key={airport.iataCode}
//       onClick={() => {
//         setOrigin(airport.iataCode);
//         setOriginQuery(`${airport.name} (${airport.iataCode})`);
//         setOriginSuggestions([]);
//       }}
//     >
//       {airport.name} ({airport.iataCode})
//     </li>
//   ))}
// </ul>


// <input
//   type="text"
//   className="p-2 border-2"
//   placeholder="To"
//   value={destinationQuery}
//   onChange={(e) => {
//     setDestinationQuery(e.target.value);
//     // fetch destinationSuggestions here
//   }}
// />
// <ul>
//   {destinationSuggestions.map((airport) => (
//     <li
//       key={airport.iataCode}
//       onClick={() => {
//         setDestination(airport.iataCode);
//         setDestinationQuery(`${airport.name} (${airport.iataCode})`);
//         setDestinationSuggestions([]);
//       }}
//     >
//       {airport.name} ({airport.iataCode})
//     </li>
//   ))}
// </ul>


//             <input className="p-2 border-2 rounded" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
//             <input className="p-2 border-2 rounded" type="number" min="1" value={adults} onChange={(e) => setAdults(e.target.value)} placeholder="Adults" />
//             <select className="p-2 border-2 rounded col-span-2" value={travelClass} onChange={(e) => setTravelClass(e.target.value)}>
//               <option value="Any">Any</option>
//               <option value="Economy">Economy</option>
//               <option value="Business">Business</option>
//               <option value="First Class">First Class</option>
//             </select>
//           </div>
//           <button className="mt-4 w-full bg-blue-900 text-white p-2 rounded text-lg" onClick={searchFlights}>Show Flights</button>
//         </div>
//       </div>
//       </div>
//     </div>
//       <div className="mt-4">
//         <div className="flex justify-between p-4">
//           <button onClick={() => setSortOrder("asc")} className="p-2 bg-blue-500 text-white">Sort: Cheapest</button>
//           <button onClick={() => setSortOrder("desc")} className="p-2 bg-blue-500 text-white">Sort: Expensive</button>
//         </div>

//         <h2 className="text-2xl font-semibold mb-4">Available Flights</h2>

// {Array.isArray(sortedFlights) && sortedFlights.length > 0 ? (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//         {sortedFlights.map((flight, index) => (
//             <div key={index} className="border rounded-lg shadow-lg p-4 bg-white">
//                 <p className="font-semibold text-lg">✈ Airline: {flight?.itineraries?.[0]?.segments?.[0]?.carrierCode || "N/A"}</p>
//                 <p>🕐 Departure: {flight?.itineraries?.[0]?.segments?.[0]?.departure?.at ? new Date(flight.itineraries[0].segments[0].departure.at).toLocaleString() : "N/A"}</p>
//                 <p>🛬 Arrival: {flight?.itineraries?.[0]?.segments?.slice(-1)[0]?.arrival?.at ? new Date(flight.itineraries[0].segments.slice(-1)[0].arrival.at).toLocaleString() : "N/A"}</p>
//                 <p>💲 Price: <span className="text-green-600 font-bold">{flight?.price?.total || "N/A"} {flight?.price?.currency || ""}</span></p>
//                 <p>🎟️ Seats Available: {flight?.numberOfBookableSeats || "N/A"}</p>
                
//                 <button onClick={() => setSelectedFlight(flight)} className="mt-4 w-full p-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-400 transition">
//                     Book Now
//                 </button>
//             </div>
//         ))}
//     </div>
// ) : (
//     <p className="text-gray-500">No flights available</p>
// )}

// {selectedFlight && (
//     <div className="relative mt-4">
//         {/* Background Image with Opacity */}
//         <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/11/90/96/89/360_F_1190968902_G2EHiiu0rkRbTdZHQxRZ9Kk2EoHizyCD.jpg')" }}></div>

//         {/* Booking Form Container */}
//         <div className="relative z-10 bg-opacity-80 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Flight: ✈ {selectedFlight.itineraries[0].segments[0].carrierCode}</h2>

//             {passengers.map((p, index) => (
//                 <div key={index} className="mb-4">
//                     <input type="text" placeholder="First Name" value={p.firstName} 
//                         onChange={(e) => {
//                             let updatedPassengers = [...passengers];
//                             updatedPassengers[index] = { ...updatedPassengers[index], firstName: e.target.value };
//                             setPassengers(updatedPassengers);
//                         }} 
//                         className="p-2 border w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
//                     />
                    
//                     <input type="text" placeholder="Last Name" value={p.lastName} 
//                         onChange={(e) => {
//                             let updatedPassengers = [...passengers];
//                             updatedPassengers[index] = { ...updatedPassengers[index], lastName: e.target.value };
//                             setPassengers(updatedPassengers);
//                         }} 
//                         className="p-2 border w-full mt-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
//                     />
                    
//                     <input type="date" value={p.dateOfBirth} 
//                         onChange={(e) => {
//                             let updatedPassengers = [...passengers];
//                             updatedPassengers[index] = { ...updatedPassengers[index], dateOfBirth: e.target.value };
//                             setPassengers(updatedPassengers);
//                         }} 
//                         className="p-2 border w-full mt-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
//                     />
//                 </div>
//             ))}

//             {/* Seat Preference Dropdown */}
//             <select value={seatPreference} 
//                 onChange={(e) => setSeatPreference(e.target.value)} 
//                 className="p-2 border w-full mt-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             >
//                 <option value="Window">Window</option>
//                 <option value="Aisle">Aisle</option>
//             </select>

//             {/* Confirm Booking Button */}
//             <button onClick={handlePayment} 
//                 className="mt-4 w-full p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition transform hover:scale-105"
//             >
//                Proceed to Payment
//             </button>
//         </div>
//     </div>
// )}

// {bookingSuccess && <p className="text-green-600 mt-4 text-center font-semibold">{bookingSuccess}</p>}

       
//       </div>
//       {/* {selectedFlight && <button onClick={handlePayment}
//       className="mt-4 w-3/12 mx-82 p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition transform hover:scale-105">
//         Proceed to Payment</button>} */}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FlightSearch() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedFlights, setSortedFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengers, setPassengers] = useState([{ firstName: "", lastName: "", dateOfBirth: "" }]);
  const [seatPreference, setSeatPreference] = useState("Window");
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [error, setError] = useState("");
  const [travelClass, setTravelClass] = useState("Any");
  const [departureDate, setDepartureDate] = useState("");
  const [originQuery, setOriginQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (flights.length > 0) {
      const sorted = [...flights].sort((a, b) =>
        sortOrder === "asc"
          ? parseFloat(a.price.total) - parseFloat(b.price.total)
          : parseFloat(b.price.total) - parseFloat(a.price.total)
      );
      setSortedFlights(sorted);
    }
  }, [sortOrder, flights]);

  // ✅ FIXED: Updated API endpoint
//   const searchFlights = async () => {
//     try {
//         const response = await axios.get("http://localhost:5000/api/airlines/flights", {
//             params: { origin: "JFK", destination: "LAX", date: "2025-04-05", adults, travelClass},
//         });

//         setFlights(response.data);
//     } catch (error) {
//         console.error("Error fetching flights:", error);
//     }
// };

const searchFlights = async () => {
  try {
    const params = {
      origin,
      destination,
      date: departureDate,
      adults,
      currencyCode: "USD"
    };
    if (travelClass !== "Any") {
      params.travelClass = travelClass;
    }

    const response = await axios.get("https://flightticket-booking-node-allapi.onrender.com/api/airlines/flights", {
      params
    });

    setFlights(response.data);
  } catch (error) {
    console.error("Error fetching flights:", error.response?.data || error.message);
  }
};


  const handlePayment = async () => {
    try {
      const amount = parseFloat(selectedFlight.price.total) * 100;

      const response = await axios.post("https://flightticket-booking-node-allapi.onrender.com/api/payment/stripe", {
        amount,
        currency: "USD",
        email: "user@example.com",
        flightDetails: {
          flightNumber: selectedFlight.id,
          passengerName: `${passengers[0].firstName} ${passengers[0].lastName}`,
          seatNumber: seatPreference,
          departure: selectedFlight.itineraries[0].segments[0].departure.iataCode,
          departureTime: selectedFlight.itineraries[0].segments[0].departure.at,
          arrival: selectedFlight.itineraries[0].segments[0].arrival.iataCode,
          arrivalTime: selectedFlight.itineraries[0].segments[0].arrival.at,
        }
      });

      navigate(`/payment?clientSecret=${response.data.clientSecret}&bookingId=${response.data.bookingId}`);
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
    }
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post("https://flightticket-booking-node-allapi.onrender.com/api/book-flight", {
        flightNumber: selectedFlight.id,
        passengerName: `${passengers[0].firstName} ${passengers[0].lastName}`, // ✅ Fixed passengerName format
        seatNumber: seatPreference,
        departure: selectedFlight.itineraries[0].segments[0].departure.iataCode,
        departureTime: selectedFlight.itineraries[0].segments[0].departure.at,
        arrival: selectedFlight.itineraries[0].segments[0].arrival.iataCode,
        arrivalTime: selectedFlight.itineraries[0].segments[0].arrival.at,
        status: "CONFIRMED",
      });

      setBookingSuccess(response.data.message);
      setSelectedFlight(null);
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
    }
  };

  
  const fetchFlights = async () => {
    try {
        const response = await axios.get("https://flightticket-booking-node-allapi.onrender.com/api/flights", {
            params: { origin, destination, date }
        });
        setFlights(response.data);
    } catch (error) {
        console.error("Error fetching flights:", error.response?.data || error.message);
    }
};

useEffect(() => {
  axios.get("https://flightticket-booking-node-allapi.onrender.com/api/flights") // ✅ Ensure correct API URL
      .then(response => {
          console.log("Flights Data:", response.data); // ✅ Debugging output
          setFlights(response.data);
      })
      .catch(error => {
          console.error("Error fetching flights:", error);
      });
}, []);

useEffect(() => {
  if (originQuery.length > 2) {
    axios.get(`https://flightticket-booking-node-allapi.onrender.com/api/airports?query=${originQuery}`)
      .then(res => setOriginSuggestions(res.data))
      .catch(err => console.error("Origin airport error", err));
  }
}, [originQuery]);

useEffect(() => {
  if (destinationQuery.length > 2) {
    axios.get(`https://flightticket-booking-node-allapi.onrender.com/api/airports?query=${destinationQuery}`)
      .then(res => setDestinationSuggestions(res.data))
      .catch(err => console.error("Destination airport error", err));
  }
}, [destinationQuery]);

// Handle suggestion click
const handleSelectOrigin = (code) => {
  setOrigin(code);
  setOriginQuery(""); // optional: clear
  setOriginSuggestions([]);
};

  return (
    <div>
       <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://blog.air.irctc.co.in/wp-content/uploads/2021/03/flight-ticket-fare.jpg')"}}>
      <div className="absolute inset-0 bg-blak bg-opacity-40">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-center text-xl font-bold text-gray-700 mb-4">Search Flights</h2>
          <div className="grid grid-cols-2 gap-4">
          <input
  type="text"
  placeholder="From"
  value={originQuery}
  onChange={(e) => {
    setOriginQuery(e.target.value);
    // fetch originSuggestions here
  }}
/>
<ul>
  {originSuggestions.map((airport) => (
    <li
      key={airport.iataCode}
      onClick={() => {
        setOrigin(airport.iataCode);
        setOriginQuery(`${airport.name} (${airport.iataCode})`);
        setOriginSuggestions([]);
      }}
    >
      {airport.name} ({airport.iataCode})
    </li>
  ))}
</ul>


<input
  type="text"
  placeholder="To"
  value={destinationQuery}
  onChange={(e) => {
    setDestinationQuery(e.target.value);
    // fetch destinationSuggestions here
  }}
/>
<ul>
  {destinationSuggestions.map((airport) => (
    <li
      key={airport.iataCode}
      onClick={() => {
        setDestination(airport.iataCode);
        setDestinationQuery(`${airport.name} (${airport.iataCode})`);
        setDestinationSuggestions([]);
      }}
    >
      {airport.name} ({airport.iataCode})
    </li>
  ))}
</ul>


            <input className="p-2 border rounded" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
            <input className="p-2 border rounded" type="number" min="1" value={adults} onChange={(e) => setAdults(e.target.value)} placeholder="Adults" />
            <select className="p-2 border rounded col-span-2" value={travelClass} onChange={(e) => setTravelClass(e.target.value)}>
              <option value="Any">Any</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
          <button className="mt-4 w-full bg-red-500 text-white p-2 rounded text-lg" onClick={searchFlights}>Show Flights</button>
        </div>
      </div>
      </div>
    </div>
      <div className="mt-4">
        <div className="flex justify-between p-4">
          <button onClick={() => setSortOrder("asc")} className="p-2 bg-blue-500 text-white">Sort: Cheapest</button>
          <button onClick={() => setSortOrder("desc")} className="p-2 bg-blue-500 text-white">Sort: Expensive</button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Available Flights</h2>

{Array.isArray(sortedFlights) && sortedFlights.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {sortedFlights.map((flight, index) => (
            <div key={index} className="border rounded-lg shadow-lg p-4 bg-white">
                <p className="font-semibold text-lg">✈ Airline: {flight?.itineraries?.[0]?.segments?.[0]?.carrierCode || "N/A"}</p>
                <p>🕐 Departure: {flight?.itineraries?.[0]?.segments?.[0]?.departure?.at ? new Date(flight.itineraries[0].segments[0].departure.at).toLocaleString() : "N/A"}</p>
                <p>🛬 Arrival: {flight?.itineraries?.[0]?.segments?.slice(-1)[0]?.arrival?.at ? new Date(flight.itineraries[0].segments.slice(-1)[0].arrival.at).toLocaleString() : "N/A"}</p>
                <p>💲 Price: <span className="text-green-600 font-bold">{flight?.price?.total || "N/A"} {flight?.price?.currency || ""}</span></p>
                <p>🎟️ Seats Available: {flight?.numberOfBookableSeats || "N/A"}</p>
                
                <button onClick={() => setSelectedFlight(flight)} className="mt-4 w-full p-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-400 transition">
                    Book Now
                </button>
            </div>
        ))}
    </div>
) : (
    <p className="text-gray-500">No flights available</p>
)}

{selectedFlight && (
    <div className="relative mt-4">
        {/* Background Image with Opacity */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/11/90/96/89/360_F_1190968902_G2EHiiu0rkRbTdZHQxRZ9Kk2EoHizyCD.jpg')" }}></div>

        {/* Booking Form Container */}
        <div className="relative z-10 bg-opacity-80 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Flight: ✈ {selectedFlight.itineraries[0].segments[0].carrierCode}</h2>

            {passengers.map((p, index) => (
                <div key={index} className="mb-4">
                    <input type="text" placeholder="First Name" value={p.firstName} 
                        onChange={(e) => {
                            let updatedPassengers = [...passengers];
                            updatedPassengers[index] = { ...updatedPassengers[index], firstName: e.target.value };
                            setPassengers(updatedPassengers);
                        }} 
                        className="p-2 border w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                    />
                    
                    <input type="text" placeholder="Last Name" value={p.lastName} 
                        onChange={(e) => {
                            let updatedPassengers = [...passengers];
                            updatedPassengers[index] = { ...updatedPassengers[index], lastName: e.target.value };
                            setPassengers(updatedPassengers);
                        }} 
                        className="p-2 border w-full mt-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                    />
                    
                    <input type="date" value={p.dateOfBirth} 
                        onChange={(e) => {
                            let updatedPassengers = [...passengers];
                            updatedPassengers[index] = { ...updatedPassengers[index], dateOfBirth: e.target.value };
                            setPassengers(updatedPassengers);
                        }} 
                        className="p-2 border w-full mt-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                    />
                </div>
            ))}

            {/* Seat Preference Dropdown */}
            <select value={seatPreference} 
                onChange={(e) => setSeatPreference(e.target.value)} 
                className="p-2 border w-full mt-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
                <option value="Window">Window</option>
                <option value="Aisle">Aisle</option>
            </select>

            {/* Confirm Booking Button */}
            <button onClick={handlePayment} 
                className="mt-4 w-full p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition transform hover:scale-105"
            >
               Proceed to Payment
            </button>
        </div>
    </div>
)}

{bookingSuccess && <p className="text-green-600 mt-4 text-center font-semibold">{bookingSuccess}</p>}

       
      </div>
      {/* {selectedFlight && <button onClick={handlePayment}
      className="mt-4 w-3/12 mx-82 p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition transform hover:scale-105">
        Proceed to Payment</button>} */}
    </div>
  );
}
