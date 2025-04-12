// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// // Connect to the WebSocket server
// const socket = io("http://localhost:5000");

// const FlightStatus = () => {
//   const [flightNumber, setFlightNumber] = useState("");
//   const [date, setDate] = useState("");
//   const [flightStatus, setFlightStatus] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!flightNumber || !date) return;

//     const fetchFlightStatus = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/flight-status/${flightNumber}/${date}`
//         );
//         setFlightStatus(response.data);
//       } catch (error) {
//         setError("Flight status unavailable");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFlightStatus();

//     // Subscribe to real-time updates
//     socket.emit("requestFlightStatus", { flightNumber, date });

//     socket.on("flightStatusUpdate", (data) => {
//       setFlightStatus(data);
//     });

//     const socket = io("http://localhost:5000");

//     socket.on("connect", () => {
//       console.log("Connected to WebSocket Server", socket.id);
//     });

//     return () => {
//       socket.off("flightStatusUpdate");
//       socket.disconnect();
//     };
//   }, [flightNumber, date]); // Removed undefined `email` and `phone`

//   const trackFlight = () => {
//     if (flightNumber && date) {
//       console.log(`Tracking flight: ${flightNumber} on ${date}`);
//       socket.emit("trackFlight", { flightNumber, date });
//     } else {
//       alert("Please enter a flight number and date.");
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold mb-4">Real-Time Flight Status</h2>
//       <input
//         type="text"
//         placeholder="Flight Number (e.g., AA100)"
//         value={flightNumber}
//         onChange={(e) => setFlightNumber(e.target.value)}
//         className="border p-2 rounded mb-2 w-full"
//       />
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="border p-2 rounded mb-2 w-full"
//       />
//       <button
//         onClick={trackFlight}
//         className="bg-blue-500 text-white p-2 rounded w-full"
//       >
//         Track Flight
//       </button>

//       {loading && <p>Loading flight status...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {flightStatus && (
//         <div className="mt-4 p-4 border rounded bg-gray-100">
//           <h3 className="text-lg font-bold">Flight Status</h3>
//           <p><strong>Flight:</strong> {flightStatus.flightNumber || "N/A"}</p>
//           <p><strong>Status:</strong> {flightStatus.status || "N/A"}</p>
//           <p>
//             <strong>Departure:</strong> {flightStatus.departure?.airport || "Unknown"} at {flightStatus.departure?.time || "N/A"}
//           </p>
//           <p>
//             <strong>Arrival:</strong> {flightStatus.arrival?.airport || "Unknown"} at {flightStatus.arrival?.time || "N/A"}
//           </p>
//           <p><strong>Seat Number:</strong> {flightStatus.seatNumber || "N/A"}</p>
//           <p><strong>Total Price:</strong> ${flightStatus.totalPrice || "N/A"}</p>
//           <p><strong>Payment Method:</strong> {flightStatus.paymentMethod || "N/A"}</p>
//           <p><strong>Date:</strong> {new Date(flightStatus.date).toLocaleString() || "N/A"}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlightStatus;

// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// // ✅ Socket initialized once
// const socket = io("http://localhost:5000");

// const FlightStatus = () => {
//   const [flightNumber, setFlightNumber] = useState("");
//   const [date, setDate] = useState("");
//   const [flightStatus, setFlightStatus] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!flightNumber || !date) return;

//     const fetchFlightStatus = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/flight-status/${flightNumber}/${date}`
//         );
//         setFlightStatus(response.data);
//       } catch (error) {
//         setError("Flight status unavailable");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFlightStatus();

//     // 🔁 Request updates
//     socket.emit("requestFlightStatus", { flightNumber, date });

//     // 🔔 Listen for updates
//     socket.on("flightStatusUpdate", (data) => {
//       setFlightStatus(data);
//     });

//     // 🧼 Cleanup listener
//     return () => {
//       socket.off("flightStatusUpdate");
//     };
//   }, [flightNumber, date]);

//   const trackFlight = () => {
//     if (flightNumber && date) {
//       console.log(`Tracking flight: ${flightNumber} on ${date}`);
//       socket.emit("trackFlight", { flightNumber, date });
//     } else {
//       alert("Please enter a flight number and date.");
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold mb-4">Real-Time Flight Status</h2>
//       <input
//         type="text"
//         placeholder="Flight Number (e.g., AA100)"
//         value={flightNumber}
//         onChange={(e) => setFlightNumber(e.target.value)}
//         className="border p-2 rounded mb-2 w-full"
//       />
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="border p-2 rounded mb-2 w-full"
//       />
//       <button
//         onClick={trackFlight}
//         className="bg-blue-500 text-white p-2 rounded w-full"
//       >
//         Track Flight
//       </button>

//       {loading && <p>Loading flight status...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {flightStatus && (
//         <div className="mt-4 p-4 border rounded bg-gray-100">
//           <h3 className="text-lg font-bold">Flight Status</h3>
//           <p><strong>Flight:</strong> {flightStatus.flightNumber || "N/A"}</p>
//           <p><strong>Status:</strong> {flightStatus.status || "N/A"}</p>
//           <p>
//             <strong>Departure:</strong> {flightStatus.departure?.airport || "Unknown"} at {flightStatus.departure?.time || "N/A"}
//           </p>
//           <p>
//             <strong>Arrival:</strong> {flightStatus.arrival?.airport || "Unknown"} at {flightStatus.arrival?.time || "N/A"}
//           </p>
//           <p><strong>Seat Number:</strong> {flightStatus.seatNumber || "N/A"}</p>
//           <p><strong>Total Price:</strong> ${flightStatus.totalPrice || "N/A"}</p>
//           <p><strong>Payment Method:</strong> {flightStatus.paymentMethod || "N/A"}</p>
//           <p><strong>Date:</strong> {new Date(flightStatus.date).toLocaleString() || "N/A"}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlightStatus;

// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:5000");

// const FlightStatus = () => {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [date, setDate] = useState("");
//   const [flightStatus, setFlightStatus] = useState(null);
//   const [error, setError] = useState("");

//   const fetchFlightStatus = async () => {
//     try {
//       setError("");
//       const res = await axios.get(`http://localhost:5000/api/flight-status/place/${origin}/${destination}/${date}`);
//       setFlightStatus(res.data);
//     } catch (err) {
//       console.error("❌ Could not fetch flight status", err);
//       setError("❌ Could not fetch flight status");
//     }
//   };

//   const trackFlight = () => {
//     if (!origin || !destination || !date) return alert("Fill all fields!");
//     fetchFlightStatus();
//     socket.emit("trackFlight", { origin, destination, date });
//   };

//   useEffect(() => {
//     socket.on("flightStatusUpdate", (data) => {
//       setFlightStatus(data);
//     });
//     return () => {
//       socket.off("flightStatusUpdate");
//     };
//   }, []);

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg bg-white rounded-xl">
//       <h2 className="text-2xl font-bold mb-4 text-center">🛫 Track Flight by Places</h2>
//       <div className="space-y-3">
//         <input type="text" placeholder="From (e.g. MAA)" value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full border p-2 rounded" />
//         <input type="text" placeholder="To (e.g. DEL)" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full border p-2 rounded" />
//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2 rounded" />
//         <button onClick={trackFlight} className="w-full bg-blue-600 text-white py-2 rounded">Track Flight</button>
//       </div>

//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {flightStatus && (
//         <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//           <h3 className="text-xl font-semibold">✈️ Flight Status</h3>
//           <p><strong>Flight:</strong> {flightStatus.flightNumber}</p>
//           <p><strong>Status:</strong> {flightStatus.status}</p>
//           <p><strong>From:</strong> {flightStatus.departure?.airport} at {new Date(flightStatus.departure?.time).toLocaleString()}</p>
//           <p><strong>To:</strong> {flightStatus.arrival?.airport} at {new Date(flightStatus.arrival?.time).toLocaleString()}</p>
//           <p><strong>Seat:</strong> {flightStatus.seatNumber}</p>
//           <p><strong>Price:</strong> ₹{flightStatus.totalPrice}</p>
//           <p><strong>Payment:</strong> {flightStatus.paymentMethod}</p>
//           <p><strong>Date:</strong> {new Date(flightStatus.date).toLocaleDateString()}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlightStatus;


import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const FlightStatus = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [flightStatus, setFlightStatus] = useState(null);
  const [error, setError] = useState("");

  const fetchFlightStatus = async () => {
    try {
      setError("");
      const res = await axios.get(
        `http://localhost:5000/api/flight-status/place/${origin}/${destination}/${date}`
      );
      setFlightStatus(res.data);
    } catch (err) {
      console.error("❌ Could not fetch flight status", err);
      setError("❌ Could not fetch flight status");
    }
  };

  const trackFlight = () => {
    if (!origin || !destination || !date)
      return alert("Fill all fields!");
    fetchFlightStatus();
    socket.emit("trackFlight", { origin, destination, date });
  };

  useEffect(() => {
    socket.on("flightStatusUpdate", (data) => {
      setFlightStatus(data);
    });
    return () => {
      socket.off("flightStatusUpdate");
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        ✈️ Real-Time Flight Tracker
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="From (e.g. MAA)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="border border-blue-300 p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          placeholder="To (e.g. DEL)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border border-blue-300 p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-blue-300 p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>
      <button
        onClick={trackFlight}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all"
      >
        Track Flight
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {flightStatus && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-blue-100">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">📍 Flight Info</h3>
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>🛩️ Flight:</strong> {flightStatus.flightNumber}
            </p>
            <p>
              <strong>📶 Status:</strong> {flightStatus.status}
            </p>
            <p>
              <strong>🛫 Departure:</strong>{" "}
              {flightStatus.departure?.airport} @{" "}
              <span className="text-gray-600">
                {new Date(flightStatus.departure?.time).toLocaleString()}
              </span>
            </p>
            <p>
              <strong>🛬 Arrival:</strong>{" "}
              {flightStatus.arrival?.airport} @{" "}
              <span className="text-gray-600">
                {new Date(flightStatus.arrival?.time).toLocaleString()}
              </span>
            </p>
            <p>
              <strong>💺 Seat No:</strong> {flightStatus.seatNumber}
            </p>
            <p>
              <strong>💳 Payment:</strong> {flightStatus.paymentMethod}
            </p>
            <p>
              <strong>💸 Price:</strong> ₹{flightStatus.totalPrice}
            </p>
            <p>
              <strong>📅 Date:</strong>{" "}
              {new Date(flightStatus.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightStatus;

