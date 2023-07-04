import { Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Flex, Button, Drawer } from '@mantine/core';
import { IconPencil, IconMessages, IconNote, IconReportAnalytics, IconTrash, IconDots } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useUserStore } from '../stores/users';
import Can from '../components/Authorization/Can';
import { PermissionSubject, UserPermissions } from '../utils/permissions';
import { useDisclosure } from '@mantine/hooks';
import EmployeeForm from '../components/Employees/EmployeeForm';

export default function EmployeeList() {
  // Get the transactions from the store and the fetchAllTransactions function
  const [employes, fetchAllUsers] = useUserStore((state) => [state.users, state.fetchAll]);
  const [opened, { open, close }] = useDisclosure(false);

  // Fetch all transactions on page load
  useEffect(() => {
    async function fetchData() {
      // Set loading to true and fetch all transactions
      await fetchAllUsers();
    }
    fetchData();
  }, [fetchAllUsers]);

  return (
    <>
      <h1>Liste des employés</h1>

      <Flex justify="space-between" align="center">
        <h3>Toutes les employés</h3>
        <Can
          perform={UserPermissions.CreateUser}
          on={PermissionSubject.User}
          yes={
            <Button onClick={open}>Créer un compte utilisateur</Button>
          }
        />
      </Flex>

      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="md">
          <tbody>
            {employes.map((item) => (
              <tr key={item.firstname}>
                <td>
                  <Group spacing="sm">
                    <Avatar size={40} src="https://thispersondoesnotexist.com" radius={40} />
                    <div>
                      <Text fz="sm" fw={500}>
                        {item.firstname} {item.lastname}
                      </Text>
                      <Text c="dimmed" fz="xs">
                        id: {item.id}
                      </Text>
                    </div>
                  </Group>
                </td>
                <td>
                  <Text fz="xs" c="dimmed">
                    Email
                  </Text>
                  <Text fz="sm">{item.email}</Text>
                </td>
                <td>
                  <Text fz="xs" c="dimmed">
                    Role
                  </Text>
                  <Text fz="sm">{item.firstname}</Text>
                </td>
                <td>
                  <Group spacing={0} position="right">
                    <ActionIcon>
                      <IconPencil size="1rem" stroke={1.5} />
                    </ActionIcon>
                    <Menu transitionProps={{ transition: 'pop' }} withArrow position="bottom-end" withinPortal>
                      <Menu.Target>
                        <ActionIcon>
                          <IconDots size="1rem" stroke={1.5} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item icon={<IconMessages size="1rem" stroke={1.5} />}>Send message</Menu.Item>
                        <Menu.Item icon={<IconNote size="1rem" stroke={1.5} />}>Add note</Menu.Item>
                        <Menu.Item icon={<IconReportAnalytics size="1rem" stroke={1.5} />}>Analytics</Menu.Item>
                        <Menu.Item icon={<IconTrash size="1rem" stroke={1.5} />} color="red">
                          Terminate contract
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>


      <Drawer position="right" opened={opened} onClose={close} title="Créer un compte utilisateur">
        <EmployeeForm close={close} />
      </Drawer>
    </>
  );
}
