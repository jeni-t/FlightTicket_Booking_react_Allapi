// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UserPreferences = ({ userId }) => {
//     const [preferences, setPreferences] = useState(null);
//     const [error, setError] = useState(null);

//     const navigate = useNavigate();


//     useEffect(() => {
//         if (!userId) {
//             setError("User ID is missing");
//             navigate("/login"); // Redirect to login if no user is found
//             return;
//         }

//         const fetchUserPreferences = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
//                 if (res.data && res.data.preferences) {
//                     setPreferences(res.data.preferences);
//                 } else {
//                     setPreferences({ preferredAirline: "Not set", seatPreference: "Not set", mealPreference: "Not set" });
//                 }
//             } catch (err) {
//                 console.error("❌ Error fetching user preferences:", err);
//                 setError("Failed to load preferences");
//             }
//         };

//         fetchUserPreferences();
//     }, [userId,navigate]);

//     if (error) {
//         return <p className="text-red-500">{error}</p>;
//     }

//     if (!preferences) {
//         return <p>Loading preferences...</p>;
//     }

//     return (
//         <div>
//             <h2>User Preferences</h2>
//             <p>Preferred Airline: {preferences.preferredAirline}</p>
//             <p>Seat Preference: {preferences.seatPreference}</p>
//             <p>Meal Preference: {preferences.mealPreference}</p>
//         </div>
//     );
// };

// export default UserPreferences;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const UserPreferences = () => {
  const { currentUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    preferredAirline: "",
    seatPreference: "",
    mealPreference: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const userId = currentUser?._id || currentUser?.id;
    if (!userId) {
      setMessage("❌ User not logged in.");
      return;
    }

    const fetchPrefs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const prefs = res.data.preferences || {};
        setForm({
          preferredAirline: prefs.preferredAirline || "",
          seatPreference: prefs.seatPreference || "",
          mealPreference: prefs.mealPreference || "",
        });
      } catch (err) {
        console.error("❌ Error fetching preferences:", err);
        setMessage("Failed to load preferences");
      } finally {
        setLoading(false);
      }
    };

    fetchPrefs();
  }, [currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = currentUser?._id || currentUser?.id;
    if (!userId) {
      setMessage("❌ User ID missing.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/users/preferences/${userId}`, form);
      setMessage("✅ Preferences updated!");
    } catch (err) {
      console.error("❌ Error updating preferences:", err);
      setMessage("Failed to update preferences.");
    }
  };

  if (!currentUser) return <p className="text-center">🔐 Please login to view preferences.</p>;
  if (loading) return <p className="text-center">Loading preferences...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg p-6 rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">User Preferences</h2>

      {message && <p className="mb-4 text-center text-blue-600 font-medium">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="preferredAirline"
          value={form.preferredAirline}
          onChange={handleChange}
          placeholder="Preferred Airline"
          className="w-full border p-2 rounded"
        />

        <select
          name="seatPreference"
          value={form.seatPreference}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Seat Preference</option>
          <option value="Window">Window</option>
          <option value="Aisle">Aisle</option>
        </select>

        <select
          name="mealPreference"
          value={form.mealPreference}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Meal Preference</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default UserPreferences;

