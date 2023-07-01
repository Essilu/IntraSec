import { Button, Grid, Modal } from '@mantine/core';
import { useState } from 'react';
import PartnerCard from '../components/Partner/PartnerCard';

// Define the SchoolList component
export default function ParnterSchoolList() {
  // Define state variables using the useState hook
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [schools, setSchooles] = useState([
    { id: 1, title: 'School 1' },
    { id: 2, title: 'School 2' },
    { id: 3, title: 'School 3' },
  ]);

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

  // Event handler for removing a school from the list
  const handleSchoolRemove = (id) => {
    const updatedSchooles = schools.filter((school) => school.id !== id);
    setSchooles(updatedSchooles);
  };

  // Event handler for adding a new school to the list
  const handleAddSchool = () => {
    const newSchool = {
      id: Date.now(),
      title: `School ${schools.length + 1}`,
    };
    setSchooles((prevSchooles) => [...prevSchooles, newSchool]);
  };

  return (
    <>
      <Grid columns={3} mb="sm">
        {/* Render a Card component for each school */}
        {schools.map((school) => (
          <Grid.Col span={1} key={school.id}>
            <PartnerCard company={school} onEdit={handleEditButtonClick} onInfo={handleInfoButtonClick} />
          </Grid.Col>
        ))}
      </Grid>

      {/* Button for adding a new school */}
      <Button onClick={handleAddSchool}>Add School</Button>

      {/* Edit modal */}
      <Modal opened={isEditModalOpen} onClose={handleEditModalClose} title="Edit Container" size="sm">
        <div>
          <p>Edit the container</p>
          {/* Display a list of schools with a remove button */}
          {schools.map((school) => (
            <div key={school.id}>
              <p>{school.title}</p>
              <Button variant="outline" onClick={() => handleSchoolRemove(school.id)} className="remove-button">
                Remove
              </Button>
            </div>
          ))}
        </div>
      </Modal>

      {/* Info modal */}
      <Modal opened={isInfoModalOpen} onClose={handleInfoModalClose} title="Classic Tour Information" size="sm">
        {/* Add your tour information here */}
      </Modal>
    </>
  );
}
