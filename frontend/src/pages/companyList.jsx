import { Card, Image, Text, Badge, Button, Group, Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import '../styles/companyList.css';

function CompanyList() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [boxes, setBoxes] = useState([
    { id: 1, title: 'Box 1' },
    { id: 2, title: 'Box 2' },
    { id: 3, title: 'Box 3' },
  ]);
  const theme = useMantineTheme();

  const handleEditButtonClick = () => {
    setEditModalOpen(true);
  };

  const handleInfoButtonClick = () => {
    setInfoModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleInfoModalClose = () => {
    setInfoModalOpen(false);
  };

  const handleBoxRemove = (id) => {
    const updatedBoxes = boxes.filter((box) => box.id !== id);
    setBoxes(updatedBoxes);
  };

  const handleAddBox = () => {
    const newBox = {
      id: Date.now(),
      title: `Box ${boxes.length + 1}`,
    };
    setBoxes((prevBoxes) => [...prevBoxes, newBox]);
  };

  return (
    <>
      <div className="company-list-container">
        {boxes.map((box) => (
          <div className="company-list-item" key={box.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{box.title}</Text>
                <Badge color="pink" variant="light" onClick={handleEditButtonClick}>
                  Edit
                </Badge>
              </Group>

              <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
              </Text>

              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={handleInfoButtonClick}
              >
                Book classic tour now
              </Button>
            </Card>
          </div>
        ))}
      </div>

      <Button onClick={handleAddBox}>Add Box</Button>

      <Modal
        opened={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Edit Container"
        size="sm"
      >
        <div>
          <p>Edit the container</p>
          {boxes.map((box) => (
            <div key={box.id}>
              <p>{box.title}</p>
              <Button
                variant="outline"
                onClick={() => handleBoxRemove(box.id)}
                className="remove-button"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        opened={isInfoModalOpen}
        onClose={handleInfoModalClose}
        title="Classic Tour Information"
        size="sm"
      >
        {/* Add your tour information here */}
      </Modal>
    </>
  );
}

export default CompanyList;
