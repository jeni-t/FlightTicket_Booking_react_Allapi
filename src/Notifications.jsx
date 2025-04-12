import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on("flight-update", (data) => {
            setNotifications((prev) => [...prev, data]);
        });

        return () => socket.off("flight-update");
    }, []);

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">📢 Flight Updates</h2>
            {notifications.length === 0 ? (
                <p>No new updates</p>
            ) : (
                <ul>
                    {notifications.map((notif, index) => (
                        <li key={index} className="p-2 border-b">{notif.message}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;
