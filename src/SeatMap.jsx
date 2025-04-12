import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const SeatMap = ({ flightOfferId }) => {

  const { flightId } = useParams();  // ✅ Get flightId from URL
  const [seats, setSeats] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log("Flight ID:", flightId);  // ✅ Check if flightId is correct

    if (!flightId) {
        setError("Flight ID is missing!");
        return;
    }

    const fetchSeatMap = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/airlines/seat-map/${flightId}`);
            setSeats(response.data);
        } catch (error) {
            console.error("❌ Error fetching seats:", error);
            setError("Error fetching seat map.");
        }
    };

    fetchSeatMap();
}, [flightId]);



  const fetchSeats = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/airlines/seat-map/${flightOfferId}`);
      setSeats(response.data);
    } catch (error) {
      console.error("❌ Error fetching seats:", error);
    }
  };

   if (error) return <p>{error}</p>;
    if (!seats.length) return <p>Loading seat map...</p>;


  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold">Seat Map</h2>
      <ul className="mt-4">
        {seats.map((seat, index) => (
          <li key={index} className="border p-2 rounded mb-2">
            <strong>Seat:</strong> {seat.number} - {seat.status || "Available"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeatMap;
