import React, { useState, useEffect } from 'react';
import "../styles/home.css";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = 'Adrien Tabouret'; // Replace 'John Doe' with the current user's name

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="Home">
      <h1 className="time">{currentTime.toLocaleTimeString()}</h1>
      <h2 className="welcome">Welcome Back, {user}</h2>
    </div>
  );
}
