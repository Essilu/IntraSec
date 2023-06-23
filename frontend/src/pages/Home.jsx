import React, { useState, useEffect } from "react";
import "../styles/home.css";

export default function Home() {
  // Define state variables
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = "Adrien Tabouret"; // Replace 'John Doe' with the current user's name

  useEffect(() => {
    // Set up interval to update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up interval on component unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="Home">
      {/* Display current time */}
      <h1 className="time">{currentTime.toLocaleTimeString()}</h1>
      {/* Display welcome message with user's name */}
      <h2 className="welcome">Welcome Back, {user}</h2>
    </div>
  );
}
