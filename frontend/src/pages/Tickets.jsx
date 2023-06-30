import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Title,
  Button,
} from '@mantine/core';
import { useTicketStore } from '../stores/tickets';
import { useEffect, useState } from 'react';

// Create custom styles using the createStyles function
const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

// Define the TableScrollArea component
export default function TableScrollArea() {
  // Get the transactions from the store and the fetchAllTransactions function
  const [tickets, fetchAllTicket] = useTicketStore((state) => [
    state.tickets,
    state.fetchAll,
  ]);

  // Fetch all transactions on page load
  useEffect(() => {
    async function fetchData() {
      // Fetch all transactions
      await fetchAllTicket();
    }
    fetchData();
  }, [fetchAllTicket]);

  // Get the styles and classes from the useStyles hook
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  return (
    <>
      {/* Display a title */}
      <Title order={1}>Tickets ouverts : </Title>
      {/* Create a scrollable area */}
      <ScrollArea
        h={300}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        {/* Render a table */}
        <Table miw={700}>
          {/* Render the table header */}
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Nom</th>
              <th>Ticket n°</th>
              <th>Titre</th>
              <th>Description</th>
            </tr>
          </thead>
          {/* Render the table body */}
          <tbody>
            {tickets.map((row) => (
              <tr key={row.id}>
                <td>{row.title}</td>
                <td>{row.id}</td>
                <td>{row.author.firstname + ' ' + row.author.lastname}</td>
                <td>
                  <Button color="green" radius="xl" size="xs" compact>
                    Plus d’infos
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
