import { Button, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { useTransactionStore } from '../stores/transactions';
import TransactionTable from '../components/Comptability/TransactionTable';
import TransactionForm from '../components/Comptability/TransactionForm';
import Can from '../components/Can';
import { PermissionSubject, TransactionPermissions } from '../utils/permissions';

export default function ComptabilityHistory() {
  // Get the transactions from the store and the fetchAllTransactions function
  const [transactions, fetchAllTransactions] = useTransactionStore((state) => [state.transactions, state.fetchAll]);
  const [opened, { open, close }] = useDisclosure(false);

  // Fetch all transactions on page load
  useEffect(() => {
    // Fetch all transactions when the component is mounted
    async function fetchData() {
      await fetchAllTransactions();
    }
    fetchData();
  }, [fetchAllTransactions]);

  return (
    <>
      <h1>Comptabilité</h1>

      <Flex justify="space-between" align="center">
        <h3>Toutes les transactions</h3>
        <Can
          perform={TransactionPermissions.CreateTransaction}
          on={PermissionSubject.Transaction}
          yes={
            <Button onClick={open}>Ajouter une transaction</Button>
          }
        />
      </Flex>

      <TransactionTable transactions={transactions} />

      <Drawer position="right" opened={opened} onClose={close} title="Ajouter une transaction">
        <TransactionForm />
      </Drawer>
    </>
  );
}
