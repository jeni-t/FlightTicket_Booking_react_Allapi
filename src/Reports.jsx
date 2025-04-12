// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { LineChart, Line, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from "recharts";

// const Reports = () => {
//   const [trends, setTrends] = useState([]);
//   const [sales, setSales] = useState([]);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get("/api/reports/trends")
//       .then(res => Array.isArray(res.data) ? setTrends(res.data) : setTrends([]))
//       .catch(err => console.error("Trend error", err));
  
//     axios.get("/api/reports/sales")
//       .then(res => Array.isArray(res.data) ? setSales(res.data) : setSales([]))
//       .catch(err => console.error("Sales error", err));
  
//     axios.get("/api/reports/users")
//       .then(res => Array.isArray(res.data) ? setUsers(res.data) : setUsers([]))
//       .catch(err => console.error("User error", err));

//       axios.get("/api/reports/sales").then(res => {
//         console.log("Sales data:", res.data);
//         if (Array.isArray(res.data)) {
//           setSales(res.data);
//         } else {
//           setSales([]);
//         }
//       });
//   }, []);

 
  
  
//   return (
//     <div className="p-8 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">📊 Reports Dashboard</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-xl font-semibold">Booking Trends (Monthly)</h3>
//           <LineChart width={500} height={300} data={trends}>
//             <XAxis dataKey="_id" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <CartesianGrid strokeDasharray="3 3" />
//             <Line type="monotone" dataKey="totalBookings" stroke="#8884d8" />
//           </LineChart>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold">Sales by Airline</h3>
//           {Array.isArray(sales) && sales.length > 0 ? (
//   <PieChart width={400} height={300}>
//     <Pie data={sales} dataKey="totalRevenue" nameKey="_id" outerRadius={100} fill="#82ca9d" label>
//       {sales.map((entry, index) => (
//         <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index % 4]} />
//       ))}
//     </Pie>
//     <Tooltip />
//   </PieChart>
// ) : (
//   <p>No sales data available.</p>
// )}

//         </div>

//         <div className="col-span-2">
//           <h3 className="text-xl font-semibold">Top Users</h3>
//           <ul className="bg-white p-4 rounded shadow space-y-2">
//             {users.map(user => (
//               <li key={user._id} className="flex justify-between">
//                 <span>User: {user._id}</span>
//                 <span>Bookings: {user.bookings}, ₹{user.totalSpent}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reports;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";

const Reports = () => {
  const [trends, setTrends] = useState([]);
  const [sales, setSales] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/reports/sales")
    .then(res => {
      console.log("Sales data response:", res.data);
      setSales(Array.isArray(res.data) ? res.data : []);
    })
    .catch(err => console.error("Sales API error", err));
  
  axios.get("/api/reports/trends")
    .then(res => {
      console.log("Trends data response:", res.data);
      setTrends(Array.isArray(res.data) ? res.data : []);
    })
    .catch(err => console.error("Trends API error", err));
  
  axios.get("/api/reports/users")
    .then(res => {
      console.log("Users data response:", res.data);
      setUsers(Array.isArray(res.data) ? res.data : []);
    })
    .catch(err => console.error("Users API error", err));
  
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Reports Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booking Trends */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Booking Trends (Monthly)</h3>
          {trends.length ? (
            <LineChart width={500} height={300} data={trends}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="totalBookings" stroke="#8884d8" />
            </LineChart>
          ) : (
            <p className="text-sm text-gray-500">No booking trend data available.</p>
          )}
        </div>

        {/* Sales by Airline */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Sales by Airline</h3>
          {sales.length ? (
            <PieChart width={400} height={300}>
              <Pie
                data={sales}
                dataKey="totalRevenue"
                nameKey="_id"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {sales.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index % 4]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <p className="text-sm text-gray-500">No sales data available.</p>
          )}
        </div>

        {/* Top Users */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Top Users</h3>
          {users.length ? (
            <ul className="bg-white p-4 rounded shadow space-y-2">
              {users.map((user) => (
                <li key={user._id} className="flex justify-between">
                  <span>User: {user._id}</span>
                  <span>
                    Bookings: {user.bookings}, ₹{user.totalSpent}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No user data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
