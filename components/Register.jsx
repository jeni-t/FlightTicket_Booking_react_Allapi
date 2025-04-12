// import { useState, useContext } from 'react';
// import AuthContext from '../context/AuthContext';

// const Register = () => {
//     const { register } = useContext(AuthContext);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await register({ name, email, password });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//             <button type="submit">Register</button>
//         </form>
//     );
// };

// export default Register;


import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import {Link} from "react-router-dom";

const Register = () => {
    const { register } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !email || !password) {
            setError('All fields are required!');
            return;
        }

        try {
            await register({ name, email, password });
            setSuccess('🎉 Registration successful!');
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.message || '❌ Registration failed.');
        }
    };

    return (
        <div>
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/public/register-images.jpg')"}}>
            <form onSubmit={handleSubmit} className="bg-opacity-40 p-8 rounded-2xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Create an Account</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-500"
                        required
                    />
                </div>

                <Link to="/FlightSearch"
                    type="submit"
                    className="px-34 w-full bg-blue-900 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200"
                >
                    Register
                </Link>
                <p className='my-2 text-center'>OR</p>
                <Link to="/login" className="px-36 w-full bg-blue-900 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200">
                Login</Link>
            </form>
        </div>
        </div>
    );
};

export default Register;

