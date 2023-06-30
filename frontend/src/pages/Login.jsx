import {
  TextInput,
  Button,
  Group,
  Box,
  Image,
  PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import '../styles/login.css';
import { useAuthStore } from '../stores/auth';
import { redirect } from 'react-router-dom';

export default function Login() {
  const login = useAuthStore((state) => state.login);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const doLogin = async (values) => {
    login(values);
    redirect('/');
  };

  return (
    <div className="parent">
      <Box className="terminal">
        <Image withPlaceholder src="/src/assets/terminal.gif" />
      </Box>
      <Box maw={500} mx="auto" className="signin">
        <Image withPlaceholder src="/src/assets/logo.png" />
        <form className="text" onSubmit={form.onSubmit(doLogin)}>
          <TextInput
            withAsterisk
            style={{ fontSize: '16px' }}
            label="email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Password"
            {...form.getInputProps('password')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Sign in</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}
