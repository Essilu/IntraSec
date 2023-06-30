import { useState, useEffect } from 'react';
import '../styles/home.css';
import { useAuthStore } from '../stores/auth';

export default function Home() {
  // Define state variables
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = useAuthStore((state) => state.user);

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
      <h2 className="welcome">Welcome Back, {user.firstname}</h2>
    </div>
  );
}
