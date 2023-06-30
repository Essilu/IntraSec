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
            <Link to="/">
              {/* NavLink component for home link */}
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
                {/* NavLink component for "Récentes" link */}
                <NavLink label="Récentes" />
              </Link>
              <Link to="/TransactionsHistory">
                {/* NavLink component for "Historiques des factures" link */}
                <NavLink label="Historiques des factures" />
              </Link>
            </NavLink>

            <Link to="/Marketing">
              {/* NavLink component for "Marketing" link */}
              <NavLink
                label="Marketing"
                icon={<IconAd size="1rem" stroke={1.5} />}
                childrenOffset={28}
                defaultOpened
              />
            </Link>
            {/* NavLink component for "International" section */}
            <NavLink
              label="International"
              icon={<IconWorld size="1rem" stroke={1.5} />}
              childrenOffset={28}
            >
              <Link to="/companyList">
                {/* NavLink component for "Entreprise partenaire" link */}
                <NavLink label="Entreprise partenaire" />
              </Link>
              <Link to="/schoolList">
                {/* NavLink component for "Ecole partenaire" link */}
                <NavLink label="Ecole partenaire" />
              </Link>
            </NavLink>
            {/* NavLink component for "Relations Humaines" section */}

            <Link to="/employeesList">
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
              <Link to="/NewTicket">
                {/* NavLink component for "Nouveau ticket" link */}
                <NavLink label="Nouveau ticket" />
              </Link>
              <Link to="/Tickets">
                {/* NavLink component for "Tickets ouverts" link */}
                <NavLink label="Tickets ouverts" />
              </Link>
            </NavLink>

            {/* NavLink component for "Administration" section */}
            <NavLink
              label="Administration"
              icon={<IconUserBolt size="1rem" stroke={1.5} />}
              childrenOffset={28}
            >
              <Link to="/Roles">
                {/* NavLink component for "Gestions des rôles" link */}
                <NavLink label="Gestions des rôles" />
              </Link>
              <Link to="/employeesAdmin">
                {/* NavLink component for "Gestion des employés" link */}
                <NavLink label="Gestion des employés" />
              </Link>
              <Link to="/">
                {/* NavLink component for "Logs" link */}
                <NavLink label="Logs" />
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
