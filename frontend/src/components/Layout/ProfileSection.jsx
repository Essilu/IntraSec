import { UnstyledButton, Group, Avatar, Text, createStyles } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { redirect } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';
import { modals } from '@mantine/modals';

// Define custom styles using createStyles
const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },
}));

export default function ProfileSection({ image, name, email, icon, ...others }) {
  // Use the useDisclosure hook to manage modal state
  const { classes } = useStyles();

  const logout = useAuthStore((state) => state.logout);

  const openConfirmationLogout = () => {
    modals.openConfirmModal({
      title: 'Se déconnecter',
      children: (
        <Text size="sm">
          Êtes-vous sûr de vouloir vous déconnecter ? Vous allez être redirigé vers la page de connexion.
        </Text>
      ),
      labels: { confirm: 'Déconnexion', cancel: 'Annuler' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await logout();
        redirect('/login');
      },
    });
  };

  return (
    // User button with avatar and user information
    <UnstyledButton onClick={openConfirmationLogout} className={classes.user} {...others}>
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
  );
}
