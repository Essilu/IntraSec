import { useState } from 'react';
import { Title, Text, Button, Modal, Container, rem, TextInput } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../styles/Marketing.css';

const initialCarouselData = [
  {
    image:
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    titleCard: 'Audit et Sécurité Offensive',
    category: 'Sécurité',
  },
  {
    image:
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    titleCard: 'CyberSOC & Menace Intelligente',
    category: 'Prévention',
  },
  {
    image:
      'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    titleCard: 'Centre de Gestion des Vulnérabilités',
    category: 'Prévention',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    titleCard: 'Sécurité des réseaux et des infrastructures',
    category: 'Sûreté',
  },
];

function Card({ image, titleCard, category, onEdit, onDelete }) {
  const handleEdit = () => {
    onEdit({ image, titleCard, category });
  };

  const handleDeleteCard = () => {
    onDelete();
  };

  return (
    <Paper
      shadow="md"
      padding="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className="marketing-card"
    >
      <div>
        <Text className="marketing-category" size="xs">
          {category}
        </Text>
        <Title order={3} className="marketing-titleCard">
          {titleCard}
        </Title>
      </div>
      <div className="marketing-controlButtonsCard">
        <Link to="/Article" className="marketing-seeArticle">
          <Button variant="white" color="dark" className="marketing-viewMoreButton">
            Voir plus
          </Button>
        </Link>
        <Button variant="white" color="blue" onClick={handleEdit} className="marketing-editButton">
          Modifier
        </Button>

        <Button variant="white" color="red" onClick={handleDeleteCard} className="marketing-deleteButton">
          Supprimer
        </Button>
      </div>
    </Paper>
  );
}

function Marketing() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [carouselData, setCarouselData] = useState(initialCarouselData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCard, setEditedCard] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCardData, setNewCardData] = useState({
    image: '',
    titleCard: '',
    category: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddCard = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewCardData({ image: '', titleCard: '', category: '' });
    setErrorMessage('');
  };

  const handleNewCardInputChange = (event) => {
    const { name, value } = event.target;
    setNewCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveNewCard = () => {
    if (!newCardData.image || !newCardData.titleCard || !newCardData.category) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }

    const newCard = { ...newCardData };
    setCarouselData((prevData) => [...prevData, newCard]);

    handleAddModalClose();
  };

  const handleDeleteCard = (index) => {
    const updatedCarouselData = [...carouselData];
    updatedCarouselData.splice(index, 1);
    setCarouselData(updatedCarouselData);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditedCard(null);
  };

const handleSaveChanges = (newCard) => {
  const updatedCarouselData = [...carouselData];
  updatedCarouselData[editedCard.index] = newCard;
  setCarouselData(updatedCarouselData);
  setEditModalOpen(false);
  setEditedCard(null);
  console.log(newCard);
};



 const handleEditCard = (card) => {
  const index = carouselData.findIndex((item) => item === card);
  setEditedCard({ ...card, index });
  setEditModalOpen(true);
};


  const slides = carouselData.map((slide, index) => (
    <Carousel.Slide key={slide.titleCard}>
      <Card {...slide} onEdit={() => handleEditCard(slide)} onDelete={() => handleDeleteCard(index)} />
    </Carousel.Slide>
  ));

  return (
    <>
      <Container className="marketing-wrapper" size={1400}>
        <div className="marketing-inner">
          <Title className="marketing-title">
            Découvrez le <Text component="span" className="marketing-highlight" inherit>
              future de la cybersecurité
            </Text>{' '}
            avec SecureCorp
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" color="dimmed" className="marketing-description">
              Découvrez nos solutions innovantes en matière de sécurité informatique. Nous vous proposons des solutions
              adaptées à vos besoins et à votre budget.
            </Text>
          </Container>
        </div>
      </Container>

      <h1> Nos solutions </h1>

      <Carousel
        slideSize="50%"
        breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
        slideGap="xl"
        align="start"
        slidesToScroll={mobile ? 1 : 2}
      >
        {slides}
      </Carousel>

      <div id="marketing-buttonChange">
        <Button variant="outline" color="green" onClick={handleAddCard}>
          Ajouter
        </Button>
      </div>

      <Modal
        opened={editModalOpen}
        onClose={handleEditModalClose}
        title="Modifier une carte"
      >
        <TextInput
          label="Image"
          placeholder="URL de l'image"
          value={editedCard?.image || ''}
          onChange={(event) => setEditedCard({ ...editedCard, image: event.target.value })}
          required
        />
        <TextInput
          label="Titre"
          placeholder="Titre de la carte"
          value={editedCard?.titleCard || ''}
          onChange={(event) => setEditedCard({ ...editedCard, titleCard: event.target.value })}
          required
        />
        <TextInput
          label="Catégorie"
          placeholder="Catégorie de la carte"
          value={editedCard?.category || ''}
          onChange={(event) => setEditedCard({ ...editedCard, category: event.target.value })}
          required
        />

        {errorMessage && <div>{errorMessage}</div>}


        <Button onClick={() => handleSaveChanges(editedCard)}>Enregistrer</Button>
      </Modal>

      <Modal
        className="marketing-modalAddCard"
        opened={showAddModal}
        onClose={handleAddModalClose}
        title="Ajouter une carte"
      >
        <TextInput
          label="Image"
          placeholder="URL de l'image"
          value={newCardData.image}
          onChange={handleNewCardInputChange}
          name="image"
          required
        />
        <TextInput
          label="Titre"
          placeholder="Titre de la carte"
          value={newCardData.titleCard}
          onChange={handleNewCardInputChange}
          name="titleCard"
          required
        />
        <TextInput
          label="Catégorie"
          placeholder="Catégorie de la carte"
          value={newCardData.category}
          onChange={handleNewCardInputChange}
          name="category"
          required
        />

        {errorMessage && <div>{errorMessage}</div>}

        <Button onClick={handleSaveNewCard}>Ajouter</Button>
      </Modal>
    </>
  );
}

export default Marketing;
