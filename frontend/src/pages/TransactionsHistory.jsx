import "../styles/Comptability.css";
import DonutChart from "react-donut-chart";
import { Table } from "@mantine/core";

export default function Comptability() {
  const elements = [
    {
      Company: "Company 1",
      TransactionType: "Deposit",
      PayementMethod: "Bank Transfer",
      Amount: 1000,
    },
    {
      Company: "Company 1",
      TransactionType: "Deposit",
      PayementMethod: "Bank Transfer",
      Amount: 1000,
    },
    {
      Company: "Company 1",
      TransactionType: "Deposit",
      PayementMethod: "Bank Transfer",
      Amount: 1000,
    },
    {
      Company: "Company 1",
      TransactionType: "Deposit",
      PayementMethod: "Bank Transfer",
      Amount: 1000,
    },
    {
      Company: "Company 1",
      TransactionType: "Deposit",
      PayementMethod: "Bank Transfer",
      Amount: 1000,
    },
    {
      Company: "Company 1",
      TransactionType: "Deposit",
      PayementMethod: "Bank Transfer",
      Amount: 1000,
    },
    {
      Company: "Company 1",
      TransactionType: "Deposit",
      PayementMethod: "Bank Transfer",
      Amount: 1000,
    },
    {
      Company: "Company 1",
      TransactionType: "Deposit",
      PayementMethod: "Bank Transfer",
      Amount: 1000,
    },
    {
      Company: "Company 1",
      TransactionType: "Deposit",
      PayementMethod: "Bank Transfer",
      Amount: 1000,
    },
    {
      Company: "Company 1",
      TransactionType: "Deposit",
      PayementMethod: "Bank Transfer",
      Amount: 1000,
    },
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.Company}</td>
      <td>{element.TransactionType}</td>
      <td>{element.PayementMethod}</td>
      <td>{element.Amount}</td>
    </tr>
  ));
  return (
    <div>
      <h1>Comptabilité</h1>

      <div>
        <h3>Toutes les transactions</h3>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Transaction Type</th>
                <th>Payement Method </th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
