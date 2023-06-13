import React, { useState } from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import '../styles/companyList.css'; // Importer le fichier CSS

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  const addCompany = () => {
    setCompanies([...companies, {}]);
  };

  const removeCompany = (index) => {
    const updatedCompanies = [...companies];
    updatedCompanies.splice(index, 1);
    setCompanies(updatedCompanies);
  };

  return (
    <div className="company-list-container">
      {companies.map((company, index) => (
        <CompanyCard
          key={index}
          index={index}
          removeCompany={removeCompany}
          className="company-card"
        />
      ))}

      <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={addCompany}>
        Add Company
      </Button>
    </div>
  );
}

function CompanyCard({ index, removeCompany }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="company-card">
      <Card.Section component="a" href="https://mantine.dev/">
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Norway Fjord Adventures</Text>
        <Badge color="pink" variant="light">
          On Sale
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
        onClick={() => removeCompany(index)}
      >
        Remove Company
      </Button>
    </Card>
  );
}

function App() {
  return (
    <div>
      <CompanyList />
    </div>
  );
}

export default App;
