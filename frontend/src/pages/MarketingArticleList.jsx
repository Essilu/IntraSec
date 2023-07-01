import { Title, Text, Button, Modal, Container, rem, TextInput, Textarea } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useMarketingStore } from '../stores/marketing';
import ArticleCard from '../components/Marketing/ArticleCard';
import '../styles/Marketing.css';

export default function MarketingArticleList() {
  const [articles, fetchAllMarketing, createArticle, deleteArticle, updateArticle] = useMarketingStore((state) => [
    state.articles,
    state.fetchAll,
    state.create,
    state.delete,
    state.update,
  ]);

  // Fetch all transactions on page load
  useEffect(() => {
    async function fetchData() {
      // Set loading to true and fetch all transactions

      await fetchAllMarketing();
    }
    fetchData();
  }, [fetchAllMarketing]);

  // Define state variables using the useState hook
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCard, setEditedCard] = useState(null);
  // Define state variables for the add modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCardData, setNewCardData] = useState({
    imageUrl: '',
    title: '',
    category: '',
    content: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Event handler for opening the add modal
  const handleAddCard = () => {
    setShowAddModal(true);
  };

  // Event handler for closing the add modal
  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewCardData({ imageUrl: '', title: '', category: '', content: '' });
    setErrorMessage('');
  };

  // Event handler for updating the new card data
  const handleNewCardInputChange = (event) => {
    const { name, value } = event.target;
    setNewCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Event handler for saving the new card
  const handleSaveNewCard = () => {
    if (!newCardData.imageUrl || !newCardData.title || !newCardData.category || !newCardData.content) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }

    createArticle(newCardData);
    handleAddModalClose();
  };

  // Event handler for deleting a card
  const handleDeleteCard = (index) => {
    deleteArticle(articles[index].id);
  };

  // Event handler for closing the edit modal
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditedCard(null);
  };

  // Event handler for saving the changes
  const handleSaveChanges = (newCard) => {
    setEditModalOpen(false);
    setEditedCard(null);
    updateArticle(newCard.id, {
      title: newCard.title,
      content: newCard.content,
      category: newCard.category,
      imageUrl: newCard.imageUrl,
    });
  };

  // Event handler for opening the edit modal
  const handleEditCard = (card) => {
    const index = articles.findIndex((item) => item === card);
    setEditedCard({ ...card, index });
    setEditModalOpen(true);
  };

  // Render the component with the carrousel
  const slides = articles.map((slide, index) => (
    <Carousel.Slide key={slide.title}>
      <ArticleCard {...slide} onEdit={() => handleEditCard(slide)} onDelete={() => handleDeleteCard(index)} />
    </Carousel.Slide>
  ));

  return (
    <>
      <Container className="marketing-wrapper" size={1400}>
        <div className="marketing-inner">
          <Title className="marketing-title">
            Découvrez le{' '}
            <Text component="span" className="marketing-highlight" inherit>
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

      <h1>Nos solutions </h1>

      <Carousel // Update the Carousel component
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

      <Modal // Update the Modal component to modify a card of the carrousel
        opened={editModalOpen}
        onClose={handleEditModalClose}
        title="Modifier une carte"
      >
        <TextInput // Update the image
          label="Image"
          placeholder="URL de l'image"
          value={editedCard?.imageUrl || ''}
          onChange={(event) => setEditedCard({ ...editedCard, imageUrl: event.target.value })}
          required
        />
        <TextInput // Update the title
          label="Titre"
          placeholder="Titre de la carte"
          value={editedCard?.title || ''}
          onChange={(event) => setEditedCard({ ...editedCard, title: event.target.value })}
          required
        />
        <TextInput // Update the category
          label="Catégorie"
          placeholder="Catégorie de la carte"
          value={editedCard?.category || ''}
          onChange={(event) => setEditedCard({ ...editedCard, category: event.target.value })}
          required
        />
        <TextInput // Update the content
          label="Contenu"
          placeholder="Contenu de l'article"
          value={editedCard?.content || ''}
          onChange={(event) => setEditedCard({ ...editedCard, content: event.target.value })}
          required
        />
        {errorMessage && <div>{errorMessage}</div>} {/* Display the error message in case */}
        <Button onClick={() => handleSaveChanges(editedCard)}>Enregistrer</Button>
      </Modal>

      <Modal // Update the Modal component to add a card to the carrousel
        className="marketing-modalAddCard"
        opened={showAddModal}
        onClose={handleAddModalClose}
        title="Ajouter une carte"
      >
        <TextInput // Update the image
          label="Image"
          placeholder="URL de l'image"
          value={newCardData.imageUrl}
          onChange={handleNewCardInputChange}
          name="image"
          required
        />
        <TextInput // Update the title
          label="Titre"
          placeholder="Titre de la carte"
          value={newCardData.title}
          onChange={handleNewCardInputChange}
          name="title"
          required
        />
        <TextInput // Update the category
          label="Catégorie"
          placeholder="Catégorie de la carte"
          value={newCardData.category}
          onChange={handleNewCardInputChange}
          name="category"
          required
        />
        <Textarea // Update the content
          label="Corps de l'article"
          placeholder="Contenu de l'article"
          value={newCardData.content}
          onChange={handleNewCardInputChange}
          name="content"
          required
          rows={10}
        />
        {errorMessage && <div>{errorMessage}</div>} {/* Display the error message in case */}
        <Button onClick={handleSaveNewCard}>Ajouter</Button>
      </Modal>
    </>
  );
}
