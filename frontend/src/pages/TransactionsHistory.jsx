import "../styles/Comptability.css";
import { Loader, Table } from "@mantine/core";
import { useTransactionStore } from "../stores/transactions";
import { useEffect, useState } from "react";

export default function Comptability() {
  const [isLoading, setLoading] = useState(true);
  // Get the transactions from the store and the fetchAllTransactions function
  const [transactions, fetchAllTransactions] = useTransactionStore(state => [state.transactions, state.fetchAll]);

  // Fetch all transactions on page load
  useEffect(() => {
    async function fetchData() {
      // Set loading to true and fetch all transactions
      setLoading(true);
      await fetchAllTransactions();
      setLoading(false);
    }
    fetchData();
  }, [fetchAllTransactions]);

  return (
    <div>
      <h1>Comptabilité</h1>

      <div>
        <h3>Toutes les transactions</h3>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Entreprise</th>
                <th>Dépot/Retrait </th>
                <th>Mode de paiement</th>
                <th>Montant</th>
              </tr>
            </thead>
            {isLoading
              ? <Loader />
              : <tbody>
                {transactions.map((element) => (
                  <tr key={element.name}>
                    <td>{element.otherCompany}</td>
                    <td>{element.type}</td>
                    <td>{element.mean}</td>
                    <td>{element.amount}</td>
                  </tr>
                ))}
            </tbody>}
          </Table>
        </div>
      </div>
    </div>
  );
}
