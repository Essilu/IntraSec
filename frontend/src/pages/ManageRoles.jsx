import {
  Group,
  Tabs,
  Title,
  Text,
  Divider,
  Space,
  Button,
  Center,
  Container,
  Tooltip,
  TextInput,
  LoadingOverlay,
  Box,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { serializePermissionValues, deserializePermissionValues } from '../utils/permissions';
import PermissionsGroup from '../components/Roles/PermissionsGroup';
import PermissionSection from '../components/Roles/PermissionSection';
import { useRoleStore } from '../stores/roles';

const permissionLabels = ['create', 'read', 'update', 'delete'];
const permissionLabelsOwn = [...permissionLabels, 'update-own', 'delete-own'];

const subsections = {
  marketing: {
    displayName: 'Marketing',
    name: 'marketing',
    labels: permissionLabelsOwn,
  },
  support: {
    displayName: 'Support',
    name: 'support',
    labels: permissionLabelsOwn,
  },
  partner: {
    displayName: 'Partenaires',
    name: 'partner',
    labels: permissionLabelsOwn,
  },
};

export default function ManageRoles() {
  const [roles, fetchAllRoles, createRole, updateRole, deleteRole] = useRoleStore((state) => [
    state.roles,
    state.fetchAll,
    state.create,
    state.update,
    state.delete,
  ]);
  const [permissionsByRole, setPermissionsByRole] = useState({});
  const [loading, setLoading] = useState(false);
  const createRoleTextInput = useRef(null);
  const renameRoleTextInput = useRef(null);

  // Fetch the data when the page loads
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchAllRoles();
      setLoading(false);
    }
    fetchData();
  }, [fetchAllRoles]);

  useEffect(() => {
    setPermissionsByRole(serializePermissionValues(roles));
  }, [roles]);

  // Modal shown when creating a new role, to enter the name
  const newRoleModal = () => {
    modals.openConfirmModal({
      title: 'Créer un rôle',
      children: <TextInput ref={createRoleTextInput} label="Nom du rôle" data-autofocus />,
      labels: { confirm: 'Créer', cancel: 'Annuler' },
      onConfirm: async () => {
        await createRole({
          name: createRoleTextInput.current.value,
          permissionTransactions: 0,
          permissionPosts: 0,
          permissionComments: 0,
          permissionUsers: 0,
          permissionRoles: 0,
        });
      },
    });
  };

  // Modal shown when renaming a role, to enter the new name
  const openRenameModal = (id) => {
    const role = roles.find((role) => role.id === id);
    modals.openConfirmModal({
      title: 'Renommer le rôle',
      children: <TextInput defaultValue={role.name} ref={renameRoleTextInput} label="Nouveau nom" data-autofocus />,
      labels: { confirm: 'Confirmer', cancel: 'Annuler' },
      onConfirm: async () => {
        await updateRole(id, { name: renameRoleTextInput.current.value });

        notifications.show({
          color: 'blue',
          title: 'Rôle renommé',
          message: (
            <Text>
              Vous avez bien renommé le rôle <b>{role.name}</b> en <b>{renameRoleTextInput.current.value}</b>.
            </Text>
          ),
        });
      },
    });
  };

  // Modal shown when deleting a role, to confirm the action
  const openDeleteModal = (id) => {
    const role = roles.find((role) => role.id === id);
    modals.openConfirmModal({
      title: 'Supprimer le rôle',
      children: (
        <Text size="sm">
          Êtes-vous sûr de vouloir supprimer le rôle <b>{role.name}</b> ? Cette action est irréversible et toutes les
          personnes ayant ce rôle le perdront.
        </Text>
      ),
      labels: { confirm: 'Supprimer', cancel: 'Annuler' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await deleteRole(id);

        notifications.show({
          color: 'red',
          title: 'Rôle supprimé',
          message: (
            <Text>
              Vous avez bien supprimé le rôle <b>{role.name}</b>.
            </Text>
          ),
        });
      },
    });
  };

  // Update the permissionsByRole state when a permission checkbox is changed
  const handleChange = (id, scope, value) => {
    setPermissionsByRole({
      ...permissionsByRole,
      [id]: {
        ...permissionsByRole[id],
        [scope]: value,
      },
    });
  };

  // Save the permissions when the save button is clicked
  const handleSave = async () => {
    let modifications = 0;
    const deserializedRoles = deserializePermissionValues(permissionsByRole);
    for (const { id, ...role } of deserializedRoles) {
      // Check if role has been modified
      const originalRole = roles.find((r) => r.id === id);
      if (
        originalRole.permissionTransactions === role.permissionTransactions &&
        originalRole.permissionPosts === role.permissionPosts &&
        originalRole.permissionComments === role.permissionComments &&
        originalRole.permissionUsers === role.permissionUsers &&
        originalRole.permissionRoles === role.permissionRoles
      ) {
        continue;
      }

      // Update the role
      await updateRole(id, role);
      modifications++;
    }

    notifications.show({
      color: 'green',
      title: 'Modifications effectuées',
      message:
        modifications > 1 ? `${modifications} rôles ont été mis à jour.` : `${modifications} rôle a été mis à jour.`,
    });
  };

  return (
    <>
      <h1>Gestion des rôles</h1>

      <Box pos="relative">
        <LoadingOverlay visible={loading} overlayBlur={2} />

        <Tabs defaultValue={roles[0]?.id.toString()} orientation="vertical">
          <Tabs.List>
            {roles.map((role) => (
              <Tabs.Tab key={role.id} value={role.id.toString()}>
                {role.name}
              </Tabs.Tab>
            ))}

            <Space h="xl" />

            <Button variant="subtle" mx="sm" compact leftIcon={<IconPlus size="0.9rem" />} onClick={newRoleModal}>
              Créer
            </Button>
          </Tabs.List>

          {roles
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((role) => (
              <Tabs.Panel key={role.id} value={role.id.toString()} mx="md">
                <Container px={0} mb="sm">
                  <Title order={2}>{role.name}</Title>

                  <Group my="lg">
                    <Button
                      variant="light"
                      color="blue"
                      leftIcon={<IconPencil size="0.9rem" />}
                      onClick={() => openRenameModal(role.id)}
                    >
                      Renommer
                    </Button>

                    {role.builtIn ? (
                      <Tooltip label="Rôle par défaut, ne peut pas être supprimé">
                        <Button
                          variant="light"
                          color="red"
                          leftIcon={<IconTrash size="0.9rem" />}
                          data-disabled
                          sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                        >
                          Supprimer
                        </Button>
                      </Tooltip>
                    ) : (
                      <Button
                        variant="light"
                        color="red"
                        leftIcon={<IconTrash size="0.9rem" />}
                        onClick={() => openDeleteModal(role.id)}
                      >
                        Supprimer
                      </Button>
                    )}
                  </Group>
                </Container>

                <Space h="xl" />

                <Title order={4} style={{ textTransform: 'uppercase' }} mb="sm">
                  Transactions
                </Title>
                <PermissionsGroup
                  permissionsByRole={permissionsByRole}
                  handleChange={handleChange}
                  permissionType="transactions"
                  labels={permissionLabels}
                  roleId={role.id}
                />

                <Divider my="lg" />

                <Title order={4} style={{ textTransform: 'uppercase' }} mb="sm">
                  Posts
                </Title>
                <PermissionSection
                  section="posts"
                  subsections={[subsections.marketing, subsections.support, subsections.partner]}
                  permissionsByRole={permissionsByRole}
                  handleChange={handleChange}
                  roleId={role.id}
                />

                <Divider my="lg" />

                <Title order={4} style={{ textTransform: 'uppercase' }} mb="sm">
                  Commentaires
                </Title>
                <PermissionSection
                  section="comments"
                  subsections={[subsections.marketing, subsections.support]}
                  permissionsByRole={permissionsByRole}
                  handleChange={handleChange}
                  roleId={role.id}
                />

                <Divider my="lg" />

                <Title order={4} style={{ textTransform: 'uppercase' }} mb="sm">
                  Utilisateurs
                </Title>
                <PermissionsGroup
                  permissionsByRole={permissionsByRole}
                  handleChange={handleChange}
                  permissionType="users"
                  labels={permissionLabels}
                  roleId={role.id}
                />

                <Divider my="lg" />

                <Title order={4} style={{ textTransform: 'uppercase' }} mb="sm">
                  Rôles
                </Title>
                <PermissionsGroup
                  permissionsByRole={permissionsByRole}
                  handleChange={handleChange}
                  permissionType="roles"
                  labels={permissionLabels}
                  roleId={role.id}
                />
              </Tabs.Panel>
            ))}
        </Tabs>

        <Space h="xl" />

        <Center my="xl">
          <Button color="green" onClick={handleSave}>
            Enregistrer
          </Button>
        </Center>
        <Space h="xl" />
      </Box>
    </>
  );
}
