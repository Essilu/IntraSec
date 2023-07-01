import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export default function PartnerCard({ company, onEdit, onInfo }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {/* Company image */}
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        {/* Company title */}
        <Text weight={500}>{company.title}</Text>
        {/* Edit button */}
        <Badge color="pink" variant="light" onClick={onEdit}>
          Edit
        </Badge>
      </Group>

      {/* Company description */}
      <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around
        the fjords of Norway
      </Text>

      {/* Button for booking */}
      <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={onInfo}>
        Book classic tour now
      </Button>
    </Card>
  );
}
