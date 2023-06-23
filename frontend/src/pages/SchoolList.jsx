import { Card, Image, Text, Badge, Button, Group, Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import '../styles/schoolList.css';

// Define the SchoolList component
function SchoolList() {
  // Define state variables using the useState hook
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [boxes, setBoxes] = useState([
    { id: 1, title: 'School 1' },
    { id: 2, title: 'School 2' },
    { id: 3, title: 'School 3' },
  ]);
  const theme = useMantineTheme();

  // Event handlers for opening the edit and info modals
  const handleEditButtonClick = () => {
    setEditModalOpen(true);
  };

  const handleInfoButtonClick = () => {
    setInfoModalOpen(true);
  };

  // Event handlers for closing the edit and info modals
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleInfoModalClose = () => {
    setInfoModalOpen(false);
  };

  // Event handler for removing a box from the list
  const handleBoxRemove = (id) => {
    const updatedBoxes = boxes.filter((box) => box.id !== id);
    setBoxes(updatedBoxes);
  };

  // Event handler for adding a new box to the list
  const handleAddBox = () => {
    const newBox = {
      id: Date.now(),
      title: `School ${boxes.length + 1}`,
    };
    setBoxes((prevBoxes) => [...prevBoxes, newBox]);
  };

  return (
    <>
      <div className="school-list-container">
        {/* Render a Card component for each box */}
        {boxes.map((box) => (
          <div className="school-list-item" key={box.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                {/* Display an image within the Card */}
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                {/* Display the title of the box */}
                <Text weight={500}>{box.title}</Text>
                {/* Display a Badge component for editing */}
                <Badge color="pink" variant="light" onClick={handleEditButtonClick}>
                  Edit
                </Badge>
              </Group>

              {/* Display a description text */}
              <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
              </Text>

              {/* Display a Button component for booking */}
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

      {/* Button for adding a new box */}
      <Button onClick={handleAddBox}>Add Box</Button>

      {/* Edit modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Edit Container"
        size="sm"
      >
        <div>
          <p>Edit the container</p>
          {/* Display a list of boxes with a remove button */}
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

      {/* Info modal */}
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

export default SchoolList;
