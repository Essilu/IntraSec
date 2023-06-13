import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
  Modal,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import "../styles/components.css";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

export default function UserButton({ image, name, email, icon, ...others }) {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Are you sure you want to log out?"
        centered
      >
        <div className="modal_parent">
          <Button className="modal_confirmation_button" variant="outline">
            Exit
          </Button>
          <Button className="modal_confirmation_button" color="red">
            Log Out
          </Button>
        </div>
      </Modal>
      <UnstyledButton onClick={open} className={classes.user} {...others}>
        <Group>
          <Avatar src={image} radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>

            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </div>

          {icon || <IconChevronRight size="0.9rem" stroke={1.5} />}
        </Group>
      </UnstyledButton>
    </>
  );
}
