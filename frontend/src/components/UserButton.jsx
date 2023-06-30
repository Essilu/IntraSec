import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
  Modal,
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import { Link, redirect } from 'react-router-dom';
import '../styles/components.css';
import { useAuthStore } from '../stores/auth';

// Define custom styles using createStyles
const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

export default function UserButton({ image, name, email, icon, ...others }) {
  // Use the useDisclosure hook to manage modal state
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  const logout = useAuthStore((state) => state.logout);

  const doLogout = async () => {
    await logout();
    redirect('/login');
  };

  return (
    <>
      {/* Modal component for logout confirmation */}
      <Modal
        opened={opened}
        onClose={close}
        title="Are you sure you want to log out?"
        centered
      >
        <div className="modal_subtext">
          <Text size="sm" color="dimmed">
            You will be redirected to the login page.
          </Text>

          <div onClick={close} className="modal_parent">
            {/* Button for canceling logout */}
            <Button className="modal_confirmation_button" variant="outline">
              Exit
            </Button>

            <Link to="/login">
              {/* Button for confirming logout */}
              <Button
                className="modal_confirmation_button"
                color="red"
                onClick={doLogout}
              >
                Log Out
              </Button>
            </Link>
          </div>
        </div>
      </Modal>

      {/* User button with avatar and user information */}
      <UnstyledButton onClick={open} className={classes.user} {...others}>
        <Group>
          <Avatar src={image} radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>

            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </div>

          {icon || <IconChevronRight size="0.9rem" stroke={1.5} />}
        </Group>
      </UnstyledButton>
    </>
  );
}
