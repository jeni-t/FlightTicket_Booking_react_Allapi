// import { useState, useContext } from 'react';
// import AuthContext from '../context/AuthContext';
// import axios from "axios";  // ✅ Ensure axios is imported

// const Login = () => {
//     const { login } = useContext(AuthContext);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const logins = async () => {
//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//             console.log("✅ Login successful:", res.data);
//             localStorage.setItem("token", res.data.token);
//         } catch (error) {
//             console.error("❌ Login error:", error.response?.data || error.message);
//             alert("Invalid login credentials");
//         }
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();  // ✅ Prevent default form submission

//         if (!email || !password) {
//             console.error("❌ Email and password are required");
//             return;
//         }

//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//             console.log("✅ Login successful:", res.data);
//             localStorage.setItem("token", res.data.token); // Save token
//         } catch (error) {
//             console.error("❌ Login error:", error.response?.data || error.message);
//         }
//     };

//     return (
//         <form onSubmit={handleLogin}>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//             <button type="submit">Login</button>
//         </form>
//     );
// };

// export default Login;


// import { useState, useContext } from 'react';
// import AuthContext from '../context/AuthContext';
// import axios from "axios";

// const Login = () => {
//     const { login } = useContext(AuthContext);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (!email || !password) {
//             setError("❌ Email and password are required");
//             return;
//         }

//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//             console.log("✅ Login successful:", res.data);
//             localStorage.setItem("token", res.data.token);
//             if (login) login(email, password); // If context login is available
//         } catch (error) {
//             console.error("❌ Login error:", error.response?.data || error.message);
//             setError("Invalid email or password ❌");
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
//             <form 
//                 onSubmit={handleLogin} 
//                 className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full space-y-6"
//             >
//                 <h2 className="text-2xl font-bold text-center text-indigo-600">Login to Your Account</h2>

//                 {error && (
//                     <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</div>
//                 )}

//                 <div>
//                     <label className="block text-sm text-gray-600 mb-1">Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         required
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm text-gray-600 mb-1">Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter your password"
//                         required
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;


import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ FIX: import this!
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // ✅ FIX: initialize
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('❌ Email and password are required');
            return;
        }

        try {
            const res = await axios.post("https://flightticket-booking-node-allapi.onrender.com/api/auth/login", { email, password });
            console.log("✅ Login successful:", res.data);
            localStorage.setItem("token", res.data.token);
            if (login) login(email, password);

            // ✅ Navigate after login
            navigate('/FlightSearch'); // change this to /dashboard or wherever you want to go
        } catch (error) {
            console.error("❌ Login error:", error.response?.data || error.message);
            setError('❌ Invalid email or password');
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://travel-blog.happyeasygo.com/wp-content/uploads/2021/03/Booking-early.jpg')"}}>
            <form onSubmit={handleLogin} className="bg-opacity-40 shadow-xl rounded-2xl p-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Login to your Account</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-gray-600">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
