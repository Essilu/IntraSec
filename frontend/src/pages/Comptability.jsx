// style import
import "../styles/Comptability.css";

// component imports
import DonutChart from "react-donut-chart";
import {
  Table,
  Button,
  Drawer,
  Group,
  Space,
  Divider,
  TextInput,
  createStyles,
  SegmentedControl,
  rem,
  NumberInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";

// other imports
import { Link } from "react-router-dom";
import { useTransactionStore } from "../stores/transactions";

export default function Comptability() {
  //Drawer controller
  const [opened, { open, close }] = useDisclosure(false);

  //SegmentedControl controller
  const [type, setType] = useState("react");
  const [mean, setMean] = useState("react");

  //Loading controller
  const [isLoading, setLoading] = useState(true);

  //Styles
  const useStyles = createStyles((theme) => ({
    root: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      boxShadow: theme.shadows.md,
      border: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[1]
      }`,
    },

    indicator: {
      backgroundImage: theme.fn.gradient({ from: "pink", to: "orange" }),
    },

    control: {
      border: "0 !important",
    },

    label: {
      "&, &:hover": {
        "&[data-active]": {
          color: theme.white,
        },
      },
    },
  }));

  // Get the transactions from the store and the fetchAllTransactions function
  const [transactions, fetchAllTransactions, createTransaction] =
    useTransactionStore((state) => [
      state.transactions,
      state.fetchAll,
      state.create,
    ]);

  // useForm hook
  const form = useForm({
    initialValues: {
      otherCompany: "",
      type: "",
      mean: "",
      amount: 0,
    },

    validate: {
      otherCompany: (value) => value.trim().length === 0,
      type: (value) => value.trim().length === 0,
      mean: (value) => value.trim().length === 0,
      amount: (value) => value <= 0,
    },
  });
  useEffect(() => {
    async function fetchData() {
      // Set loading to true and fetch all transactions
      setLoading(true);
      await fetchAllTransactions();
      setLoading(false);
    }
    fetchData();
  }, [fetchAllTransactions]);

  // Fetch all transactions on page load
  const rows = transactions.map((element) => (
    <tr key={element.name}>
      <td>{element.otherCompany}</td>
      <td>{element.type}</td>
      <td>{element.mean}</td>
      <td>{element.amount}</td>
    </tr>
  ));

  const { classes } = useStyles();
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
        <Space h="md" />
        <Divider my="sm" />

        <h3>Dernières transactions:</h3>
        <Drawer
          position="right"
          opened={opened}
          onClose={close}
          title="Ajouter une transaction"
        >
          <form onSubmit={form.onSubmit((values) => createTransaction(values))}>
            <TextInput
              withAsterisk
              label="Entreprise"
              placeholder="Nom de l'entreprise"
              {...form.getInputProps("otherCompany")}
            />
            <Space h="md" />

            <SegmentedControl
              value={mean}
              onChange={setMean}
              radius="xl"
              size="md"
              data={["CARD", "CHECK", "CASH", "TRANSFER"]}
              classNames={classes}
              {...form.getInputProps("mean")}
            />
            <Space h="md" />
            <NumberInput
              withAsterisk
              label="Montant"
              placeholder="10000"
              {...form.getInputProps("amount")}
            />
            <Space h="md" />

            <Space h="md" />
            <SegmentedControl
              value={type}
              onChange={setType}
              radius="xl"
              size="md"
              data={["DEBIT", "CREDIT"]}
              classNames={classes}
              {...form.getInputProps("type")}
            />
            <Space h="md" />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Drawer>

        <Group position="right">
          <Button onClick={open}>Ajouter une transaction</Button>
        </Group>
        <Space h="md" />
        <Space h="md" />
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
          <Space h="md" />
          <Space h="md" />
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
