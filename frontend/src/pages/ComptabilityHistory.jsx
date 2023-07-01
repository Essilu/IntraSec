import { useEffect } from 'react';
import { useTransactionStore } from '../stores/transactions';
import TransactionTable from '../components/Comptability/TransactionTable';

export default function ComptabilityHistory() {
  // Get the transactions from the store and the fetchAllTransactions function
  const [transactions, fetchAllTransactions] = useTransactionStore((state) => [state.transactions, state.fetchAll]);

  // Fetch all transactions on page load
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

      <div>
        <h3>Toutes les transactions</h3>
        <div>
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
