import { useState } from "react";
import {
  Title,
  Text,
  Button,
  Modal,
  Container,
  rem,
  TextInput,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { Paper, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import "../styles/Marketing.css";

// Define the initial carousel data
const initialCarouselData = [
  {
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    titleCard: "Audit et Sécurité Offensive",
    category: "Sécurité",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    titleCard: "CyberSOC & Menace Intelligente",
    category: "Prévention",
  },
  {
    image:
      "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    titleCard: "Centre de Gestion des Vulnérabilités",
    category: "Prévention",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    titleCard: "Sécurité des réseaux et des infrastructures",
    category: "Sûreté",
  },
];

// Define the Card component
function Card({ image, titleCard, category, onEdit, onDelete }) {
  // Render the component
  const handleEdit = () => {
    onEdit({ image, titleCard, category });
  };

  // Event handler for deleting the card
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
        {/* Update show more button to navigate to the corresponding page*/}
        {/* <Link to={`/CardPage/${titleCard}`} className="marketing-seeArticle"> */}
        <Link to="/Article" className="marketing-seeArticle">
          <Button
            variant="white"
            color="dark"
            className="marketing-viewMoreButton"
          >
            Voir plus
          </Button>
        </Link>
        <Button
          variant="white"
          color="blue"
          onClick={handleEdit} // Update the event handler
          className="marketing-editButton"
        >
          Modifier
        </Button>

        <Button
          variant="white"
          color="red"
          onClick={handleDeleteCard} // Update the event handler
          className="marketing-deleteButton"
        >
          Supprimer
        </Button>
      </div>
    </Paper>
  );
}

// Define the Marketing component
function Marketing() {
  // Define state variables using the useState hook
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [carouselData, setCarouselData] = useState(initialCarouselData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCard, setEditedCard] = useState(null);
  // Define state variables for the add modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCardData, setNewCardData] = useState({
    image: "",
    titleCard: "",
    category: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Event handler for opening the add modal
  const handleAddCard = () => {
    setShowAddModal(true);
  };

  // Event handler for closing the add modal
  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewCardData({ image: "", titleCard: "", category: "" });
    setErrorMessage("");
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
    if (!newCardData.image || !newCardData.titleCard || !newCardData.category) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    const newCard = { ...newCardData };
    setCarouselData((prevData) => [...prevData, newCard]);

    handleAddModalClose();
  };

  // Event handler for deleting a card
  const handleDeleteCard = (index) => {
    const updatedCarouselData = [...carouselData];
    updatedCarouselData.splice(index, 1);
    setCarouselData(updatedCarouselData);
  };

  // Event handler for closing the edit modal
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditedCard(null);
  };

  // Event handler for saving the changes
  const handleSaveChanges = (newCard) => {
    const updatedCarouselData = [...carouselData];
    updatedCarouselData[editedCard.index] = newCard;
    setCarouselData(updatedCarouselData);
    setEditModalOpen(false);
    setEditedCard(null);
    console.log(newCard);
  };

  // Event handler for opening the edit modal
  const handleEditCard = (card) => {
    const index = carouselData.findIndex((item) => item === card);
    setEditedCard({ ...card, index });
    setEditModalOpen(true);
  };

  // Render the component with the carrousel
  const slides = carouselData.map((slide, index) => (
    <Carousel.Slide key={slide.titleCard}>
      <Card
        {...slide}
        onEdit={() => handleEditCard(slide)}
        onDelete={() => handleDeleteCard(index)}
      />
    </Carousel.Slide>
  ));

  return (
    <>
      <Container className="marketing-wrapper" size={1400}>
        <div className="marketing-inner">
          <Title className="marketing-title">
            Découvrez le{" "}
            <Text component="span" className="marketing-highlight" inherit>
              future de la cybersecurité
            </Text>{" "}
            avec SecureCorp
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" color="dimmed" className="marketing-description">
              Découvrez nos solutions innovantes en matière de sécurité
              informatique. Nous vous proposons des solutions adaptées à vos
              besoins et à votre budget.
            </Text>
          </Container>
        </div>
      </Container>

      <h1> Nos solutions </h1>

      <Carousel // Update the Carousel component
        slideSize="50%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: rem(2) }]}
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
          value={editedCard?.image || ""}
          onChange={(event) =>
            setEditedCard({ ...editedCard, image: event.target.value })
          }
          required
        />
        <TextInput // Update the title
          label="Titre"
          placeholder="Titre de la carte"
          value={editedCard?.titleCard || ""}
          onChange={(event) =>
            setEditedCard({ ...editedCard, titleCard: event.target.value })
          }
          required
        />
        <TextInput // Update the category
          label="Catégorie"
          placeholder="Catégorie de la carte"
          value={editedCard?.category || ""}
          onChange={(event) =>
            setEditedCard({ ...editedCard, category: event.target.value })
          }
          required
        />
        {errorMessage && <div>{errorMessage}</div>}{" "}
        {/* Display the error message in case */}
        <Button onClick={() => handleSaveChanges(editedCard)}>
          Enregistrer
        </Button>
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
          value={newCardData.image}
          onChange={handleNewCardInputChange}
          name="image"
          required
        />
        <TextInput // Update the title
          label="Titre"
          placeholder="Titre de la carte"
          value={newCardData.titleCard}
          onChange={handleNewCardInputChange}
          name="titleCard"
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
        {errorMessage && <div>{errorMessage}</div>}{" "}
        {/* Display the error message in case */}
        <Button onClick={handleSaveNewCard}>Ajouter</Button>
      </Modal>
    </>
  );
}

export default Marketing;