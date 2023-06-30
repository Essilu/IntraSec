import {
  Avatar,
  Table,
  Group,
  Text,
  ScrollArea,
  MultiSelect,
} from '@mantine/core';
import { useUserStore } from '../stores/users';
import { useRoleStore } from '../stores/roles';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';

export default function UsersRolesTable() {
  const [users, fetchAllUsers, addRoles, removeRoles] = useUserStore(
    (state) => [state.users, state.fetchAll, state.addRoles, state.removeRoles]
  );
  const [roles, fetchAllRoles] = useRoleStore((state) => [
    state.roles,
    state.fetchAll,
  ]);
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await Promise.all([fetchAllUsers(), fetchAllRoles()]);
    }
    fetchData();
  }, [fetchAllUsers, fetchAllRoles]);

  useEffect(() => {
    setRoleData(
      roles.map((role) => ({ value: role.id.toString(), label: role.name }))
    );
  }, [roles]);

  const updateRoles = async (userId, rawRoleIds) => {
    const roleIds = rawRoleIds.map(Number);
    const user = users.find((user) => user.id === userId);
    const userRoles = user.roles.map((role) => role.id);

    const rolesToAdd = roleIds.filter((roleId) => !userRoles.includes(roleId));
    const rolesToRemove = userRoles.filter(
      (roleId) => !roleIds.includes(roleId)
    );

    // If we're trying to remove all roles, we can't do that
    if (rolesToRemove.length === userRoles.length) {
      notifications.show({
        color: 'red',
        title: 'Impossible de supprimer tous les rôles',
        message: 'Un utilisateur doit avoir au moins un rôle',
      });
      return;
    }

    if (rolesToAdd.length > 0) await addRoles(userId, rolesToAdd);
    if (rolesToRemove.length > 0) await removeRoles(userId, rolesToRemove);
  };

  return (
    <>
      <div>
        <h1>Gestion des employés</h1>
      </div>
      <ScrollArea>
        <Table miw={800} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Employé</th>
              <th>Rôles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Group spacing="sm">
                    <Avatar
                      size={40}
                      src="https://thispersondoesnotexist.com"
                      radius={40}
                    />
                    <div>
                      <Text fz="sm" fw={500}>
                        {`${user.firstname} ${user.lastname}`}
                      </Text>
                      <Text fz="xs" c="dimmed">
                        {user.email}
                      </Text>
                    </div>
                  </Group>
                </td>
                <td>
                  <MultiSelect
                    value={user.roles.map((role) => role.id.toString())}
                    onChange={(values) => updateRoles(user.id, values)}
                    data={roleData}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
