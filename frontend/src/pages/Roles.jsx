import { Group, Tabs, Title, Text, Divider, Space, Button, Center, Container, Tooltip, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlus, IconPencil, IconTrash } from '@tabler/icons-react';
import { useRoleStore } from '../stores/roles';
import { useEffect, useRef, useState } from 'react';
import { serializePermissionValues, deserializePermissionValues } from '../utils/permissions';
import PermissionsGroup from '../components/Roles/PermissionsGroup';
import PermissionSection from '../components/Roles/PermissionSection';

export default function Roles() {
  const [roles, fetchAllRoles, createRole, updateRole, deleteRole] = useRoleStore((state) => [state.roles, state.fetchAll, state.create, state.update, state.delete]);
  const [permissionsByRole, setPermissionsByRole] = useState({});
  const createRoleTextInput = useRef(null);
  const renameRoleTextInput = useRef(null);

  // Fetch the data when the page loads
  useEffect(() => {
    async function fetchData() {
      const result = await fetchAllRoles();
      setPermissionsByRole(serializePermissionValues(result));
    }
    fetchData();
  }, [fetchAllRoles]);

  // Modal shown when creating a new role, to enter the name
  const newRoleModal = () => {
    modals.openConfirmModal({
      title: 'Créer un rôle',
      children: <TextInput ref={createRoleTextInput} label="Nom du rôle" data-autofocus/>,
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
      }
    });
  };

  // Modal shown when renaming a role, to enter the new name
  const openRenameModal = (id) => {
    const role = roles.find(role => role.id === id);
    modals.openConfirmModal({
      title: 'Renommer le rôle',
      children: <TextInput defaultValue={role.name} ref={renameRoleTextInput} label="Nouveau nom" data-autofocus/>,
      labels: { confirm: 'Confirmer', cancel: 'Annuler' },
      onConfirm: async () => {
        await updateRole(id, { name: renameRoleTextInput.current.value });
      }
    });
  };

  // Modal shown when deleting a role, to confirm the action
  const openDeleteModal = (id) => {
    const role = roles.find(role => role.id === id);
    modals.openConfirmModal({
      title: 'Supprimer le rôle',
      children: (
        <Text size="sm">
          Êtes-vous sûr de vouloir supprimer le rôle <b>{role.name}</b> ? Cette action est irréversible et toutes les personnes ayant ce rôle
          le perdront.
        </Text>
      ),
      labels: { confirm: 'Supprimer', cancel: "Annuler" },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await deleteRole(id);
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
      }
    });
  };

  // Save the permissions when the save button is clicked
  const handleSave = async () => {
    const deserializedRoles = deserializePermissionValues(permissionsByRole);
    for (const { id, ...role } of deserializedRoles) {
      // Check if role has been modified
      const originalRole = roles.find(r => r.id === id);
      if (originalRole.permissionTransactions === role.permissionTransactions
        && originalRole.permissionPosts === role.permissionPosts
        && originalRole.permissionComments === role.permissionComments
        && originalRole.permissionUsers === role.permissionUsers
        && originalRole.permissionRoles === role.permissionRoles) {
        continue;
      }

      await updateRole(id, role);
    }
  };

  return (
    <>
      <h1>Gestion des rôles</h1>
      <Tabs defaultValue={roles[0]?.id.toString()} orientation="vertical">
        <Tabs.List>
          {roles.map((role) =>
            <Tabs.Tab key={role.id} value={role.id.toString()}>{role.name}</Tabs.Tab>)}

          <Space h="xl"/>

          <Button variant="subtle" mx="sm" compact leftIcon={<IconPlus size="0.9rem" />} onClick={newRoleModal}>
            Créer
          </Button>
        </Tabs.List>

        {roles
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((role) =>
            <Tabs.Panel key={role.id} value={role.id.toString()} mx="md">
              <Container px={0} mb="sm">
                <Title order={2}>{role.name}</Title>
                <Group my="lg">
                  <Button
                    variant="light"
                    color="blue"
                    leftIcon={<IconPencil size="0.9rem" />}
                    onClick={() => openRenameModal(role.id)}
                  >Renommer</Button>
                  {role.builtIn
                    ?
                      <Tooltip label="Rôle par défaut, ne peut pas être supprimé">
                        <Button variant="light" color="red" leftIcon={<IconTrash size="0.9rem" />} data-disabled sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}>Supprimer</Button>
                      </Tooltip>
                    : <Button variant="light" color="red" leftIcon={<IconTrash size="0.9rem" />} onClick={() => openDeleteModal(role.id)}>Supprimer</Button>}
                </Group>
              </Container>

              <Space h="xl"/>

              <Title order={4} style={{textTransform: 'uppercase'}} mb="sm">Transactions</Title>
              <PermissionsGroup
                permissionsByRole={permissionsByRole}
                handleChange={handleChange}
                permissionType="transactions"
                labels={["create", "read", "update", "delete"]}
                roleId={role.id}
              />

              <Divider my="lg" />

              <Title order={4} style={{textTransform: 'uppercase'}} mb="sm">Posts</Title>
              <PermissionSection
                section="posts"
                subsections={[
                  { displayName: "Marketing", name: "marketing", labels: ["create", "read", "update", "update-own", "delete", "delete-own"] },
                  { displayName: "Support", name: "support", labels: ["create", "read", "update", "update-own", "delete", "delete-own"] },
                  { displayName: "Partenaires", name: "partner", labels: ["create", "read", "update", "update-own", "delete", "delete-own"] }
                ]}
                permissionsByRole={permissionsByRole}
                handleChange={handleChange}
                roleId={role.id}
              />

              <Divider my="lg" />

              <Title order={4} style={{textTransform: 'uppercase'}} mb="sm">Commentaires</Title>
              <PermissionSection
                section="comments"
                subsections={[
                  { displayName: "Marketing", name: "marketing", labels: ["create", "read", "update", "update-own", "delete", "delete-own"] },
                  { displayName: "Support", name: "support", labels: ["create", "read", "update", "update-own", "delete", "delete-own"] },
                ]}
                permissionsByRole={permissionsByRole}
                handleChange={handleChange}
                roleId={role.id}
              />

              <Divider my="lg" />

              <Title order={4} style={{textTransform: 'uppercase'}} mb="sm">Utilisateurs</Title>
              <PermissionsGroup
                permissionsByRole={permissionsByRole}
                handleChange={handleChange}
                permissionType="users"
                labels={["create", "read", "update", "delete"]}
                roleId={role.id}
              />

              <Divider my="lg" />

              <Title order={4} style={{textTransform: 'uppercase'}} mb="sm">Rôles</Title>
              <PermissionsGroup
                permissionsByRole={permissionsByRole}
                handleChange={handleChange}
                permissionType="roles"
                labels={["create", "read", "update", "delete"]}
                roleId={role.id}
              />

            </Tabs.Panel>
        )}
      </Tabs>
      <Space h="xl"/>
      <Center my="xl">
        <Button color="green" onClick={handleSave}>
          Enregistrer
        </Button>
      </Center>
      <Space h="xl"/>
    </>
  );
}
