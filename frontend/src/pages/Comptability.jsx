import "../styles/Comptability.css";
import DonutChart from "react-donut-chart";
import { Table,Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Comptability() {
  const elements = [
    {
      Company: "Total Energies",
      TransactionType: "Dépot",
      PayementMethod: "Chèque",
      Amount: 1000,
    },
    {
      Company: "Entreprise 1",
      TransactionType: "Dépot",
      PayementMethod: "Chèque",
      Amount: 1000,
    },
    {
      Company: "Entreprise 1",
      TransactionType: "Dépot",
      PayementMethod: "Chèque",
      Amount: 1000,
    },
    {
      Company: "Entreprise 1",
      TransactionType: "Dépot",
      PayementMethod: "Chèque",
      Amount: 1000,
    },
    {
      Company: "Entreprise 1",
      TransactionType: "Dépot",
      PayementMethod: "Chèque",
      Amount: 1000,
    },
    {
      Company: "Entreprise 1",
      TransactionType: "Dépot",
      PayementMethod: "Chèque",
      Amount: 1000,
    },
    {
      Company: "Entreprise 1",
      TransactionType: "Dépot",
      PayementMethod: "Chèque",
      Amount: 1000,
    },
    {
      Company: "Entreprise 1",
      TransactionType: "Dépot",
      PayementMethod: "Chèque",
      Amount: 1000,
    },
    {
      Company: "Entreprise 1",
      TransactionType: "Dépot",
      PayementMethod: "Chèque",
      Amount: 1000,
    },
    {
      Company: "Entreprise 1",
      TransactionType: "Dépot",
      PayementMethod: "Chèque",
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
      <div className="Revenue">
        <div className="Chart">
          <h2>Revenus par entreprises</h2>
          <div>
            <DonutChart
              height={350}
              width={550}
              data={[
                {
                  label: "Entreprise 1",
                  value: 13750,
                },
                {
                  label: "Entreprise 2",
                  value: 7300,
                },
                {
                  label: "Entreprise 3",
                  value: 15600,
                },
                {
                  label: "Entreprise 4",
                  value: 13200,
                },
                {
                  label: "Entreprise 5",
                  value: 20700,
                },
                {
                  label: "Autres",
                  value: 6000,
                },
              ]}
            />
          </div>
        </div>
        <div className="Balance">
          <h2>Revenus totaux sur l'année : </h2>
          <h1 className="money">197 800 $ </h1>
        </div>
      </div>

      <div>
        <h3>Dernières transactions:</h3>
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
            <tbody>{rows}</tbody>
          </Table>
          <Link to="/TransactionsHistory" className="seeTransactions">
            <Button variant="outline" color="indigo">
              Voir toutes les transactions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
