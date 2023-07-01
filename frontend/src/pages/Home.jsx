import { Container, Title } from '@mantine/core';
import { useState, useEffect } from 'react';
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
    <Container style={{ textAlign: 'center', marginTop: '100px' }}>
      {/* Display current time */}
      <Title order={1} style={{ fontSize: '5rem' }}>
        {currentTime.toLocaleTimeString()}
      </Title>
      <br />
      {/* Display welcome message with user's name */}
      <Title order={2} style={{ fontSize: '4rem' }}>
        Bienvenue, {user.firstname}
      </Title>
    </Container>
  );
}
