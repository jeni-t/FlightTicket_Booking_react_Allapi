// import { useState, useEffect } from "react";
// import axios from "axios";

// const ProfileManagement = ({ userId }) => {
//     const [user, setUser] = useState({ name: "", email: "" });

//     useEffect(() => {
//         axios.get(`/api/users/${userId}`)
//             .then(response => setUser(response.data))
//             .catch(error => console.error("Error fetching user data:", error));
//     }, [userId]);

//     const handleChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     };

//     const updateUser = () => {
//         axios.put(`/api/users/update/${userId}`, user)
//             .then(response => alert("Profile updated successfully!"))
//             .catch(error => console.error("Error updating user details:", error));
//     };

//     return (
//         <div>
//             <h2>Manage Profile</h2>
//             <label>Name:
//                 <input type="text" name="name" value={user.name} onChange={handleChange} />
//             </label>
//             <label>Email:
//                 <input type="email" name="email" value={user.email} onChange={handleChange} />
//             </label>
//             <button onClick={updateUser}>Update Profile</button>
//         </div>
//     );
// };

// export default ProfileManagement;


import { useState, useEffect } from "react";
import axios from "axios";

const ProfileManagement = ({ userId }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateUser = () => {
    setIsSaving(true);
    axios
      .put(`/api/users/update/${userId}`, user)
      .then(() => {
        setSuccessMsg("✅ Profile updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch((error) => console.error("Error updating user details:", error))
      .finally(() => setIsSaving(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-lg border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Manage Your Profile
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your email address"
            />
          </div>

          {successMsg && (
            <p className="text-green-600 text-sm text-center">{successMsg}</p>
          )}

          <button
            onClick={updateUser}
            disabled={isSaving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md"
          >
            {isSaving ? "Saving..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
