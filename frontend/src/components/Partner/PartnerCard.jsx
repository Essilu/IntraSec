import { Card, Image, Text, Button, Grid, ActionIcon, Flex, Badge } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

export default function PartnerCard({ partner, onSeeMore, onEdit, onRemove }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {/* Partner image */}
        <Image src={partner.imageUrl} height={160} withPlaceholder alt="Norway" />
      </Card.Section>

      <Flex justify="space-between" mt="md" mb="xs">
        <Text weight={500}>{partner.title}</Text>
        {partner.category && (
          <Badge color="blue" variant="light">
            {partner.category}
          </Badge>
        )}
      </Flex>

      {/* Partner description */}
      <Text size="sm" color="dimmed" lineClamp={3}>
        {partner.content}
      </Text>

      {/* Button for booking */}
      <Grid columns={6} mt="sm" gutter={10}>
        <Grid.Col span={4} pl={0} pr={10}>
          <Button variant="light" color="blue" fullWidth onClick={onSeeMore}>
            Voir plus
          </Button>
        </Grid.Col>

        <Grid.Col span={1} pl={0} pr={10}>
          <ActionIcon variant="light" color="blue" size="lg" w="100%" h="100%" onClick={onEdit}>
            <IconPencil />
          </ActionIcon>
        </Grid.Col>

        <Grid.Col span={1} px={0}>
          <ActionIcon variant="light" color="red" size="lg" w="100%" h="100%" onClick={onRemove}>
            <IconTrash />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
