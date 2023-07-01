import { Navbar, NavLink } from '@mantine/core';
import { IconHome2, IconUserBolt, IconHelp, IconUsersGroup, IconWorld, IconAd, Icon123 } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import ProfileSection from './ProfileSection';
import { useAuthStore } from '../../stores/auth';

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);

  return (
    // Shell component for the navigation bar
    <Navbar width={{ base: 300 }} p="xs" className="layout-sidebar">
      <Navbar.Section grow>
        {/* NavLink component for home link */}
        <Link to="/">
          <NavLink label="Accueil" icon={<IconHome2 size="1rem" stroke={1.5} />} childrenOffset={28} />
        </Link>

        {/* NavLink component for "Comptabilité" section */}
        <NavLink label="Comptabilité" icon={<Icon123 size="1rem" stroke={1.5} />} childrenOffset={28}>
          <Link to="/comptability">
            <NavLink label="Aperçu" />
          </Link>
          <Link to="/comptability/history">
            <NavLink label="Historiques" />
          </Link>
        </NavLink>

        {/* NavLink component for "Marketing" link */}
        <Link to="/articles">
          <NavLink label="Marketing" icon={<IconAd size="1rem" stroke={1.5} />} childrenOffset={28} defaultOpened />
        </Link>

        {/* NavLink component for "Partenarias" section */}
        <NavLink label="Partenariats" icon={<IconWorld size="1rem" stroke={1.5} />} childrenOffset={28}>
          <Link to="/partners/companies">
            <NavLink label="Entreprises" />
          </Link>
          <Link to="/partners/schools">
            <NavLink label="Écoles" />
          </Link>
        </NavLink>

        {/* NavLink component for "Relations Humaines" section */}
        <Link to="/employees">
          <NavLink label="Relations Humaines" icon={<IconUsersGroup size="1rem" stroke={1.5} />} childrenOffset={28} />
        </Link>

        {/* NavLink component for "Support" section */}
        <NavLink label="Support" icon={<IconHelp size="1rem" stroke={1.5} />} childrenOffset={28}>
          <Link to="/support">
            <NavLink label="Tickets ouverts" />
          </Link>
          <Link to="/support/new">
            <NavLink label="Nouveau ticket" />
          </Link>
        </NavLink>

        {/* NavLink component for "Administration" section */}
        <NavLink label="Administration" icon={<IconUserBolt size="1rem" stroke={1.5} />} childrenOffset={28}>
          <Link to="/manage/roles">
            <NavLink label="Gestions des rôles" />
          </Link>
          <Link to="/manage/employees">
            <NavLink label="Gestion des employés" />
          </Link>
        </NavLink>
      </Navbar.Section>

      <Navbar.Section>
        <ProfileSection
          image="https://thispersondoesnotexist.com"
          name={`${user.firstname} ${user.lastname}`}
          email={user.email}
        />
      </Navbar.Section>
    </Navbar>
  );
}
