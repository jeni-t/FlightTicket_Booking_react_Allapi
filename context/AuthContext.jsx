// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from "jwt-decode";  // ✅ Correct

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem('token'));
//     const [currentUser, setCurrentUser] = useState(null);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true });
//                 setCurrentUser(res.data.user);
//             } catch (error) {
//                 console.error("Error fetching user:", error);
//             }
//         };
//         fetchUser();
//     }, []);
    
    
//     const register = async (userData) => { 
//         try {
//             console.log("Sending user data:", userData);
//             const res = await axios.post('http://localhost:5000/api/auth/register', userData, {
//                 headers: { "Content-Type": "application/json" }
//             });
//             console.log("Registration successful:", res.data);
//             return res.data;
//         } catch (error) {
//             console.error("Registration error:", error.response ? error.response.data : error.message);
//             throw error;
//         }
//     };
    

//     const login = async (email, password) => {
//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//             console.log("✅ Login successful:", res.data);
//             localStorage.setItem("token", res.data.token); // Save token
//             setCurrentUser(res.data.user); // Ensure this is correctly set
//             return res.data;
//         } catch (error) {
//             console.error("❌ Login error:", error.response?.data || error.message);
//             return null;
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setToken(null);
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{register, login, logout, currentUser, setCurrentUser}}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;

import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("token");
        if (tokenFromStorage) {
            try {
                const decoded = jwtDecode(tokenFromStorage);
                setCurrentUser(decoded.user); // assuming your token includes { user: { ... } }
            } catch (error) {
                console.error("Token decode failed:", error);
                setCurrentUser(null);
            }
        }
    }, []);
    

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            const decoded = jwtDecode(res.data.token);
            setCurrentUser(decoded); // ✅ sets _id, email, etc.
            return res.data;
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;