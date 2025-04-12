// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import FlightSearch from "./components/FlightSearch";
// import MyBookings from "./components/MyBookings";
// import PaymentPage from "./components/PaymentForm";

// function App() {
//   return (
//     <Router>
//       <nav className="p-4 bg-gray-200">
//         <Link to="/" className="mr-4">Search Flights</Link>
//         <Link to="/my-bookings">My Bookings</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<FlightSearch />} />
//         <Route path="/my-bookings" element={<MyBookings />} />
//         <Route path="/payment" element={<PaymentPage amount={200} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FlightSearch from "./FlightSearch";
import FlightStatus from "./FlightStatus"; // adjust path
import Reports from "./Reports"; 
import BookingManagement from "./BookingManagement";
import PaymentPage from "./PaymentForm";
import { AuthContext, AuthProvider } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from './Dashboard';
import UserPreferences from "../components/UserPreferences";
import BookingHistory from "../components/BookingHistory";
import ProfileManagement from "../components/ProfileManagement";



const App = () => {
    const authContext = useContext(AuthContext); // ✅ Check if AuthContext is available

    if (!authContext) {
        console.error("AuthContext is undefined. Make sure AuthProvider is wrapping the component tree.");
        return <div>Loading...</div>; // Temporary fix while debugging
    }

    const { currentUser } = useContext(AuthContext);

    return (
        <AuthProvider>
        <Router>
            <div className="min-h-screen bg-gray-100">
                {/* Navigation */}
                <nav className="bg-blue-600 text-white p-4 shadow-md">
                    <div className="max-w-6xl mx-auto flex justify-between">
                        <h1 className="text-xl font-bold">Flight Booking System</h1>
                        <div className="space-x-4">
                            <Link to="/FlightSearch" className="hover:underline">Search Flights</Link>
                            <Link to="/bookings" className="hover:underline">My Bookings</Link>
                            <Link to="/preferences" className="hover:underline">Preferences</Link>
                            <Link to="/booking-history" className="hover:underline">Booking History</Link>
                            <Link to="/profile" className="hover:underline">Profile</Link>
                            <Link to="/flight-status" className="hover:underline">
  Track Flight Status
</Link>
<Link to="/reports" className="text-white hover:underline">
  Reports
</Link>

                        </div>
                    </div>
                </nav>

                {/* Routes */}
                <div className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
                    <Routes>
                    <Route path="/" element={<Register />} />
                        <Route path="/FlightSearch" element={<FlightSearch />} />
                        <Route path="/bookings" element={<BookingManagement />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/Reports" element={<Reports />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/flight-status" element={<FlightStatus />} />
                        <Route path="/preferences" element={<UserPreferences userId={currentUser?._id} />} />
                        <Route path="/booking-history" element={<BookingHistory userId={currentUser?.email} />} />
   <Route path="/profile" element={<ProfileManagement />} />
                    {/* <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} /> */}
                    </Routes>
                </div>
            </div>
        </Router>
        </AuthProvider>
    );
};

export default App;


