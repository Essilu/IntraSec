import "../styles/Comptability.css"
import DonutChart from 'react-donut-chart';
import { Table } from '@mantine/core';

export default function Comptability() {
  const elements = [
    { Company: 'Company 1', TransactionType:'Deposit', PayementMethod: 'Bank Transfer', Amount: 1000 },
    { Company:'Company 1' , TransactionType:'Deposit', PayementMethod: 'Bank Transfer', Amount: 1000 },
    { Company: 'Company 1', TransactionType:'Deposit', PayementMethod: 'Bank Transfer', Amount: 1000 },
    { Company: 'Company 1', TransactionType:'Deposit', PayementMethod: 'Bank Transfer', Amount: 1000 },
    { Company: 'Company 1', TransactionType: 'Deposit' ,PayementMethod: 'Bank Transfer', Amount: 1000 },
    { Company: 'Company 1', TransactionType: 'Deposit' ,PayementMethod: 'Bank Transfer', Amount: 1000 },
    { Company: 'Company 1', TransactionType: 'Deposit' ,PayementMethod: 'Bank Transfer', Amount: 1000 },
    { Company: 'Company 1', TransactionType: 'Deposit' ,PayementMethod: 'Bank Transfer', Amount: 1000 },
    { Company: 'Company 1', TransactionType: 'Deposit' ,PayementMethod: 'Bank Transfer', Amount: 1000 },
    { Company: 'Company 1', TransactionType: 'Deposit' ,PayementMethod: 'Bank Transfer', Amount: 1000 },

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
      <h1>Comptability
      </h1>
      <div className="Revenue">
        <div className="Chart"><h2>Revenue per company  :</h2>
          <div>
            <DonutChart height={350} width={550}

              data={[
                {
                  label: 'Company 1',
                  value: 13750,
                },
                {
                  label: 'Company 2',
                  value: 7300,
                },
                {
                  label: 'Company 3',
                  value: 15600,
                }, {
                  label: 'Company 4',
                  value: 13200,
                },
                {
                  label: 'Company 5',
                  value: 20700,
                }, {
                  label: 'Others',
                  value: 6000,
                },
              ]}

            />;</div>
        </div>
        <div className="Balance"><h2>Total revenue this year : </h2>
          <h1 className="money">197 800 $ </h1>
        </div>
      </div>



      <div>

        <h3>Latest transactions :</h3>
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
            <a className="button" href="/Historique transactions">Voir la liste de toutes les transactions</a>
        </div>
      </div>
    </div>
  );
}