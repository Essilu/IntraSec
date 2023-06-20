import {
  TextInput,
  Button,
  Group,
  Box,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

import "../styles/login.css";

export default function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const submit = (formValues) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, formValues)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div className="parent">
      <Box maw={500} mx="auto" className="signin">
        <Image withPlaceholder src="/src/assets/logo.png" />
        <form className="text" onSubmit={form.onSubmit(submit)}>
          <TextInput
            withAsterisk
            style={{ fontSize: "16px" }}
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <TextInput
            withAsterisk
            label="Password"
            placeholder="my_secure_password123"
            {...form.getInputProps("password")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Sign in</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}
