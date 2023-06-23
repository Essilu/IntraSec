import { Card, Image, Text, Badge, Button, Group, Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import '../styles/companyList.css';

function CompanyList() {
  // State variables
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [boxes, setBoxes] = useState([
    { id: 1, title: 'Company 1' },
    { id: 2, title: 'Company 2' },
    { id: 3, title: 'Company 3' },
  ]);

  // Mantine theme
  const theme = useMantineTheme();

  // Event handlers
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
      title: `Company ${boxes.length + 1}`,
    };
    setBoxes((prevBoxes) => [...prevBoxes, newBox]);
  };

  return (
    <>
      <div className="company-list-container">
        {/* Render company boxes */}
        {boxes.map((box) => (
          <div className="company-list-item" key={box.id}>
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
                <Text weight={500}>{box.title}</Text>
                {/* Edit button */}
                <Badge color="pink" variant="light" onClick={handleEditButtonClick}>
                  Edit
                </Badge>
              </Group>

              {/* Company description */}
              <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
              </Text>

              {/* Button for booking */}
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

      {/* Add Box button */}
      <Button onClick={handleAddBox}>Add Box</Button>

      {/* Edit Modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Edit Container"
        size="sm"
      >
        <div>
          <p>Edit the container</p>
          {/* Render boxes in edit modal */}
          {boxes.map((box) => (
            <div key={box.id}>
              <p>{box.title}</p>
              {/* Remove button */}
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

      {/* Info Modal */}
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
