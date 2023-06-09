/* eslint-disable react/no-unescaped-entities */
import { Container, Title, Text, Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMarketingStore } from "../stores/marketing";
import "../styles/Article.css";

export default function MarketingArticle() {
  const { id: rawId } = useParams();
  const id = Number(rawId);
  const [article, fetchArticle, updateArticle] = useMarketingStore((state) => [
    state.article,
    state.fetchOne,
    state.update,
  ]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchArticle(id);
      setEditedContent(response.content);
      setEditedTitle(response.title);
      setEditedImageUrl(response.imageUrl);
    }
    fetchData();
  }, [fetchArticle, id]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(article?.title);
  const [editedContent, setEditedContent] = useState(article?.content);
  const [editedImageUrl, setEditedImageUrl] = useState(article?.imageUrl);
  const [errorMessage, setErrorMessage] = useState("");

  // Event handlers for opening the edit and info modals
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setErrorMessage('');
  };

  // Event handler for saving the changes
  const handleSaveChanges = async () => {
    setEditModalOpen(false);
    setErrorMessage("");
    await updateArticle(id, {
      title: editedTitle,
      content: editedContent,
      imageUrl: editedImageUrl,
    });
    console.log(editedImageUrl);
  };

  // Event handler for opening the edit modal
  const handleEditContent = () => {
    setEditModalOpen(true);
  };


  // Render the component
  return (
    <>
      <div
        className="article-root"
        style={{
          '--article-image-background': `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(${editedImageUrl})`,
        }}
      >
        <Container size="lg">
          <div className="article-inner">
            <div className="article-content">
              <div className="article-title-wrapper">
                <div className="article-title-background" />
                <Title className="article-title">
                  {/* Display the article title here */}
                  <Text component="span" inherit variant="gradient" gradient={{ from: 'pink', to: 'yellow' }}>
                    {article?.title || "Titre de l'article"}
                  </Text>{' '}
                </Title>
                <div className="article-button">
                  <Button variant="white" color="blue" onClick={handleEditContent}>
                    Modifier
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Display the article description for the changes */}
      <Container>
        <div className="article-description">
          <Text>{article?.content}</Text>
        </div>
      </Container>

      {/* Display the edit modal */}
      <Modal opened={editModalOpen} onClose={handleEditModalClose} title="Modifier le contenu de l'article">
        <TextInput // Update the image
          label="Image"
          placeholder="URL de l'image"
          value={editedImageUrl}
          onChange={(event) => setEditedImageUrl(event.target.value)}
          name="image"
          required
        />

        <TextInput // Update the title
          label="Titre"
          placeholder="Titre de l'article"
          value={editedTitle}
          onChange={(event) => setEditedTitle(event.target.value)}
          required
        />

        <Textarea
          label="Corps de l'article"
          placeholder="Contenu de l'article"
          value={editedContent}
          onChange={(event) => setEditedContent(event.target.value)}
          required
          rows={10}
        />
        {/* Display the error message if there is one */}
        {errorMessage && <div>{errorMessage}</div>}

        <Button onClick={handleSaveChanges}>Enregistrer</Button>
      </Modal>

      {/* Display the contact us section */}
      <Container className="article-contact-us">
        <Title className="article-contact-us-title">Contact Us</Title>
        <Text>
          Si vous souhaitez avoir un devis ou des informations sur nos services, n'hésitez pas à nous contacter.
        </Text>
      </Container>
    </>
  );
}
