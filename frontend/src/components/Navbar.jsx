import { AppShell, Navbar as Shell, Header, Image } from '@mantine/core';

export default function Navbar({children}) {
  return (
    <AppShell
      padding="md"
      navbar={<Shell width={{ base: 300 }} p="xs"><Image withPlaceholder src="/src/assets/logo.png"/></Shell>}
      header={<Header height={60} p="xs">{/* Header content */}</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {children}
    </AppShell>
  );
}