import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Title,
  Button,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export default function TableScrollArea() {
  const data = [
    {
      ti_number: 1,
      ti_title: "Mouse bug",
      name: "Pierre Ponce",
    },
    {
      ti_number: 2,
      ti_title: "Display glitch",
      name: "Emma Evans",
    },
    {
      ti_number: 3,
      ti_title: "Network connection issue",
      name: "Oliver Owens",
    },
    {
      ti_number: 4,
      ti_title: "Application crash",
      name: "Sophia Saunders",
    },
    {
      ti_number: 5,
      ti_title: "Database error",
      name: "Noah Newton",
    },
    {
      ti_number: 6,
      ti_title: "Print job failure",
      name: "Ava Anderson",
    },
    {
      ti_number: 7,
      ti_title: "Slow system performance",
      name: "Liam Lambert",
    },
    {
      ti_number: 8,
      ti_title: "Audio distortion",
      name: "Isabella Ingram",
    },
    {
      ti_number: 9,
      ti_title: "File corruption",
      name: "Mia Mitchell",
    },
    {
      ti_number: 10,
      ti_title: "Login authentication problem",
      name: "Lucas Lawson",
    },
    {
      ti_number: 11,
      ti_title: "Data synchronization error",
      name: "Sophie Spencer",
    },
    {
      ti_number: 12,
      ti_title: "Mobile app compatibility issue",
      name: "Henry Hudson",
    },
  ];

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.ti_number}>
      <td>{row.ti_number}</td>
      <td>{row.ti_title}</td>
      <td>{row.name}</td>
      <td>
        <Button color="green" radius="xl" size="xs" compact>
          Plus d'infos
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Title order={1}>Tickets ouverts : </Title>
      <ScrollArea
        h={300}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table miw={700}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Nom</th>
              <th>Ticket n°</th>
              <th>Titre</th>
              <th>Description   </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
