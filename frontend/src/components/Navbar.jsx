import { AppShell, Navbar as Shell, Header, NavLink } from '@mantine/core';
import {
  IconHome2,
  IconUserBolt,
  IconHelp,
  IconUsersGroup,
  IconWorld,
  IconAd,
  Icon123,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import '../styles/components.css';
import UserButton from './UserButton';
import { useAuthStore } from '../stores/auth';

export default function Navbar({ children }) {
  const user = useAuthStore((state) => state.user);
  // Render the navigation bar component
  return (
    <AppShell
      padding="md"
      header={
        // Header component with logo
        <Header height={60}>
          <img className="navbarLogo" src="/src/assets/logo.png" />
        </Header>
      }
      navbar={
        // Shell component for the navigation bar
        <Shell width={{ base: 300 }} p="xs">
          <Shell.Section grow>
            {/* NavLink component for home link */}
            <Link to="/">
              <NavLink
                label="Accueil"
                icon={<IconHome2 size="1rem" stroke={1.5} />}
                childrenOffset={28}
              />
            </Link>

            {/* NavLink component for "Comptabilité" section */}
            <NavLink
              label="Comptabilité"
              icon={<Icon123 size="1rem" stroke={1.5} />}
              childrenOffset={28}
            >
              <Link to="/comptability">
                <NavLink label="Aperçu" />
              </Link>
              <Link to="/comptability/history">
                <NavLink label="Historiques" />
              </Link>
            </NavLink>

            {/* NavLink component for "Marketing" link */}
            <Link to="/articles">
              <NavLink
                label="Marketing"
                icon={<IconAd size="1rem" stroke={1.5} />}
                childrenOffset={28}
                defaultOpened
              />
            </Link>

            {/* NavLink component for "Partenarias" section */}
            <NavLink
              label="Partenariats"
              icon={<IconWorld size="1rem" stroke={1.5} />}
              childrenOffset={28}
            >
              <Link to="/partners/companies">
                <NavLink label="Entreprise partenaire" />
              </Link>
              <Link to="/partners/schools">
                <NavLink label="Ecole partenaire" />
              </Link>
            </NavLink>

            {/* NavLink component for "Relations Humaines" section */}
            <Link to="/employees">
              <NavLink
                label="Relations Humaines"
                icon={<IconUsersGroup size="1rem" stroke={1.5} />}
                childrenOffset={28}
              />
            </Link>

            {/* NavLink component for "Support" section */}
            <NavLink
              label="Support"
              icon={<IconHelp size="1rem" stroke={1.5} />}
              childrenOffset={28}
            >
              <Link to="/support">
                <NavLink label="Tickets ouverts" />
              </Link>
              <Link to="/support/new">
                <NavLink label="Nouveau ticket" />
              </Link>
            </NavLink>

            {/* NavLink component for "Administration" section */}
            <NavLink
              label="Administration"
              icon={<IconUserBolt size="1rem" stroke={1.5} />}
              childrenOffset={28}
            >
              <Link to="/roles">
                <NavLink label="Gestions des rôles" />
              </Link>
              <Link to="/roles/users">
                <NavLink label="Gestion des employés" />
              </Link>
            </NavLink>
          </Shell.Section>

          <Shell.Section>
            {/* UserButton component */}
            <UserButton
              image="https://thispersondoesnotexist.com"
              name={`${user.firstname} ${user.lastname}`}
              email={user.email}
            />
          </Shell.Section>
        </Shell>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
