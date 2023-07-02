import { Button, Group, Space, TextInput, SegmentedControl, NumberInput, Input, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTransactionStore } from '../../stores/transactions';

const meanData = [
  { value: 'CARD', label: 'Carte bancaire' },
  { value: 'CHECK', label: 'Chèque' },
  { value: 'CASH', label: 'Espèces' },
  { value: 'TRANSFER', label: 'Virement' },
];

const typeData = [
  { value: 'DEBIT', label: 'Débit' },
  { value: 'CREDIT', label: 'Crédit' },
];

export default function TransactionForm() {
  // Get the transactions from the store and the fetchAllTransactions function
  const createTransaction = useTransactionStore((state) => state.create);

  // useForm hook
  const form = useForm({
    initialValues: {
      otherCompany: '',
      type: 'DEBIT',
      mean: 'CARD',
      amount: 0,
    },

    validate: {
      otherCompany: (value) => value.trim().length === 0,
      type: (value) => value.trim().length === 0,
      mean: (value) => value.trim().length === 0,
      amount: (value) => value <= 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => createTransaction(values))}>
      <TextInput
        withAsterisk
        label="Entreprise"
        placeholder="Nom de l'entreprise"
        {...form.getInputProps('otherCompany')}
      />

      <Space h="md" />

      <Stack>
        <Input.Label required>Moyen de paiement</Input.Label>
        <SegmentedControl withAsterisk radius="xl" data={meanData} {...form.getInputProps('mean')} />
      </Stack>

      <Space h="md" />

      <NumberInput withAsterisk label="Montant" placeholder="10000" {...form.getInputProps('amount')} />

      <Space h="md" />

      <Stack>
        <Input.Label required>Direction de la transaction</Input.Label>
        <SegmentedControl radius="xl" data={typeData} {...form.getInputProps('type')} />
      </Stack>

      <Space h="md" />

      <Group position="right" mt="md">
        <Button type="submit">Valider</Button>
      </Group>
    </form>
  );
}
