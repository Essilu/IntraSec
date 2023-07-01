import { Table, Title, Button } from '@mantine/core';
import { useEffect } from 'react';
import { useTicketStore } from '../stores/tickets';

// Define the TableScrollArea component
export default function SupportTicketList() {
  // Get the ticketss from the store and the fetchAllTickets function
  const [tickets, fetchAllTickets] = useTicketStore((state) => [state.tickets, state.fetchAll]);

  // Fetch all tickets on page load
  useEffect(() => {
    async function fetchData() {
      await fetchAllTickets();
    }
    fetchData();
  }, [fetchAllTickets]);

  return (
    <>
      {/* Display a title */}
      <Title order={1}>Tickets ouverts : </Title>

      {/* Render a table */}
      <Table miw={700}>
        {/* Render the table header */}
        <thead>
          <tr>
            <th>Ticket n°</th>
            <th>Nom</th>
            <th>Titre</th>
            <th></th>
          </tr>
        </thead>

        {/* Render the table body */}
        <tbody>
          {tickets.map((row) => (
            <tr key={row.id}>
              <td>#{row.id}</td>
              <td>{row.title}</td>
              <td>{row.author.firstname + ' ' + row.author.lastname}</td>
              <td>
                <Button color="blue" radius="xl" size="xs" compact>
                  Voir plus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
