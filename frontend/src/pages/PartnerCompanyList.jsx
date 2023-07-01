import { Button, Grid, Modal } from '@mantine/core';
import { useState } from 'react';
import PartnerCard from '../components/Partner/PartnerCard';

export default function PartnerCompanyList() {
  // State variables
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [companies, setCompanies] = useState([
    { id: 1, title: 'Company 1' },
    { id: 2, title: 'Company 2' },
    { id: 3, title: 'Company 3' },
  ]);

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

  const handleCompanyRemove = (id) => {
    const updatedCompanies = companies.filter((comp) => comp.id !== id);
    setCompanies(updatedCompanies);
  };

  const handleAddCompany = () => {
    const newCompany = {
      id: Date.now(),
      title: `Company ${companies.length + 1}`,
    };
    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
  };

  return (
    <>
      {/* Render company cards */}
      <Grid columns={3} mb="sm">
        {companies.map((company) => (
          <Grid.Col span={1} key={company.id}>
            <PartnerCard company={company} onEdit={handleEditButtonClick} onInfo={handleInfoButtonClick} />
          </Grid.Col>
        ))}
      </Grid>

      {/* Add Company button */}
      <Button onClick={handleAddCompany}>Add Company</Button>

      {/* Edit Modal */}
      <Modal opened={isEditModalOpen} onClose={handleEditModalClose} title="Edit Container" size="sm">
        <div>
          <p>Edit the container</p>
          {/* Render companies in edit modal */}
          {companies.map((company) => (
            <div key={company.id}>
              <p>{company.title}</p>
              {/* Remove button */}
              <Button variant="outline" onClick={() => handleCompanyRemove(company.id)} mt={0}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      </Modal>

      {/* Info Modal */}
      <Modal opened={isInfoModalOpen} onClose={handleInfoModalClose} title="Classic Tour Information" size="sm">
        {/* Add your tour information here */}
      </Modal>
    </>
  );
}
