import { Button, Group, Space, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUserStore } from '../../stores/users';
import { notifications } from '@mantine/notifications';

export default function EmployeeForm({ close }) {
  // Get the users from the store and the fetchAllUsers function
  const createUser = useUserStore((state) => state.create);

  // useForm hook
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    },

    validate: {
      email: (value) => value.trim().length === 0 || !value.includes('@'),
      password: (value) => value.trim().length === 0,
      firstname: (value) => value.trim().length === 0,
      lastname: (value) => value.trim().length === 0,
    },
  });

  const handleSubmit = async (values) => {
    try {
      await createUser(values);
      close();
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.message === 'User already exists') {
          form.setFieldError('email', 'Cet email est déjà utilisé');
        } else {
          notifications.show({
            title: 'Données invalide',
            message: 'Le formulaire contient des erreurs',
            color: 'red',
          });
        }
      } else {
        notifications.show({
          title: 'Erreur',
          message: 'Une erreur est survenue',
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="Prénom"
        placeholder="Pierre"
        {...form.getInputProps('firstname')}
      />

      <Space h="md" />

      <TextInput
        withAsterisk
        label="Nom"
        placeholder="Dupont"
        {...form.getInputProps('lastname')}
      />

      <Space h="md" />

      <TextInput
        withAsterisk
        label="Email"
        placeholder="pierre.dupont@securecorp.fr"
        {...form.getInputProps('email')}
      />

      <Space h="md" />

      <PasswordInput
        withAsterisk
        label="Mot de passe"
        {...form.getInputProps('password')}
      />

      <Group position="right" mt="md">
        <Button type="submit">Créer</Button>
      </Group>
    </form>
  );
}
