import { AppShell, Header } from '@mantine/core';
import Sidebar from './Layout/Sidebar';

export default function Layout({ children }) {
  // Render the navigation bar component
  return (
    <AppShell
      padding="md"
      header={
        // Header component with logo
        <Header height={60}>
          <img height={60} src="/src/assets/logo.png" />
        </Header>
      }
      navbar={<Sidebar />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
