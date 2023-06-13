import {
  AppShell,
  Navbar as Shell,
  Header,
  Image,
  NavLink,
} from "@mantine/core";
import { IconHome2, IconUserBolt, IconHelp, IconUsersGroup, IconWorld, IconAd, Icon123 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import UserButton from "./UserButton";

export default function Navbar({ children }) {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60}>
          <Image
            height={60}
            ml="10px"
            withPlaceholder
            src="/src/assets/logo.png"
          />
        </Header>
      }
      navbar={
        <Shell width={{ base: 300 }} p="xs">
          <Shell.Section grow> 
          <Link to="/">
          <NavLink
            label="Accueil"
            icon={<IconHome2 size="1rem" stroke={1.5} />}
            childrenOffset={28}
          />
          </Link>
          <NavLink
            label="Comptabilité"
            icon={<Icon123 size="1rem" stroke={1.5} />}
            childrenOffset={28}
          >
            <Link to="/comptability">
              <NavLink label="Récentes" />
            </Link>
            <Link to="/TransactionHistory">
              <NavLink label="Historiques des factures" />
            </Link>
          </NavLink>

          <Link to="/">
            <NavLink
              label="Marketing"
              icon={<IconAd size="1rem" stroke={1.5} />}
              childrenOffset={28}
              defaultOpened
            />
          </Link>
          <NavLink
            label="International"
            icon={<IconWorld size="1rem" stroke={1.5} />}
            childrenOffset={28}
          >
            <Link to="/companyList">
              <NavLink label="Entreprise partenaire" />
            </Link>
            <Link to="/schoolList">
              <NavLink label="Ecole partenaire" />
            </Link>
          </NavLink>
          <NavLink
            label="Relations Humaines"
            icon={<IconUsersGroup size="1rem" stroke={1.5} />}
            childrenOffset={28}
          >
            <Link to="/">
              <NavLink label="Employés" />
            </Link>
            <Link to="/">
              <NavLink label="Gestion des employés" />
            </Link>
          </NavLink>

          <NavLink
            label="Support"
            icon={<IconHelp size="1rem" stroke={1.5} />}
            childrenOffset={28}
          >
            <Link to="/">
              <NavLink label="Nouveau ticket" />
            </Link>
            <Link to="/">
              <NavLink label="Tickets ouverts" />
            </Link>
          </NavLink>

          <NavLink
            label="Administration"
            icon={<IconUserBolt size="1rem" stroke={1.5} />}
            childrenOffset={28}
          >
            <Link to="/">
              <NavLink label="Gestions des rôles" />
            </Link>
            <Link to="/">
              <NavLink label="Gestions des employées" />
            </Link>
            <Link to="/">
              <NavLink label="Logs" />
            </Link>
          </NavLink>
          </Shell.Section>
          <Shell.Section>
        <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name="Ann Nullpointer"
          email="anullpointer@yahoo.com"
        />
      </Shell.Section>
        </Shell>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
