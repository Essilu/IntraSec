import { Table } from '@mantine/core';

export default function TransactionTable({ transactions }) {
  return (
    <Table mb="xl">
      <thead>
        <tr>
          <th>Entreprise</th>
          <th>Dépot/Retrait </th>
          <th>Mode de paiement</th>
          <th>Montant</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.name}>
            <td>{transaction.otherCompany}</td>
            <td>{transaction.type}</td>
            <td>{transaction.mean}</td>
            <td>{transaction.amount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
