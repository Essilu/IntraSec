import { Button, Drawer, Divider, Title, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import DonutChart from 'react-donut-chart';
import { Link } from 'react-router-dom';
import { useTransactionStore } from '../stores/transactions';
import TransactionForm from '../components/Comptability/TransactionForm';
import TransactionTable from '../components/Comptability/TransactionTable';
import Can from '../components/Authorization/Can';
import { PermissionSubject, TransactionPermissions } from '../utils/permissions';

export default function ComptabilityDashboard() {
  // Drawer controller
  const [opened, { open, close }] = useDisclosure(false);

  // Get the transactions from the store and the fetchAllTransactions function
  const [transactions, fetchAllTransactions] = useTransactionStore((state) => [state.transactions, state.fetchAll]);

  useEffect(() => {
    // Fetch all transactions when the component is mounted
    async function fetchData() {
      await fetchAllTransactions();
    }
    fetchData();
  }, [fetchAllTransactions]);

  return (
    <div>
      <h1>Comptabilité</h1>
      <Flex justify={'space-around'}>
        <div>
          <Title order={2}>Revenus par entreprises</Title>
          <DonutChart
            height={350}
            width={550}
            data={[
              {
                label: 'Entreprise 1',
                value: 13750,
              },
              {
                label: 'Entreprise 2',
                value: 7300,
              },
              {
                label: 'Entreprise 3',
                value: 15600,
              },
              {
                label: 'Entreprise 4',
                value: 13200,
              },
              {
                label: 'Entreprise 5',
                value: 20700,
              },
              {
                label: 'Autres',
                value: 6000,
              },
            ]}
          />
        </div>
        <div>
          <Title order={2}>Revenus totaux sur l’année</Title>
          <Title order={1} color="teal">
            $197 800 981
          </Title>
        </div>
      </Flex>

      <Divider my="xl" />

      <Flex justify="space-between" mb="xl">
        <Title order={3}>Dernières transactions</Title>
        <Flex gap={5}>
          <Link to="/comptability/history">
            <Button variant="outline">Voir toutes les transactions</Button>
          </Link>
          <Can
            perform={TransactionPermissions.CreateTransaction}
            on={PermissionSubject.Transaction}
            yes={<Button onClick={open}>Ajouter une transaction</Button>}
          />
        </Flex>
      </Flex>

      <TransactionTable transactions={transactions.slice(0, 10)} />

      <Can
        perform={TransactionPermissions.CreateTransaction}
        on={PermissionSubject.Transaction}
        yes={
          <Drawer position="right" opened={opened} onClose={close} title="Ajouter une transaction">
            <TransactionForm />
          </Drawer>
        }
      />
    </div>
  );
}
