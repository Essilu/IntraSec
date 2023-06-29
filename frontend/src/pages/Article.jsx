/* eslint-disable react/no-unescaped-entities */
import { Container, Title, Text, Button, Modal, Textarea } from "@mantine/core";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMarketingStore } from "../stores/marketing";
import "../styles/Article.css";

function Article() {
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
    }
    fetchData();
  }, [fetchArticle, id]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(article?.title);
  const [editedContent, setEditedContent] = useState(article?.content);
  const [errorMessage, setErrorMessage] = useState("");

  // Event handlers for opening the edit and info modals
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setErrorMessage("");
  };

  // Event handler for saving the changes
  const handleSaveChanges = async () => {
    // Effectuer les actions de sauvegarde ici
    setEditModalOpen(false);
    setErrorMessage("");
    await updateArticle(id, { title: editedTitle, content: editedContent });
  };

  // Event handler for opening the edit modal
  const handleEditContent = () => {
    setEditModalOpen(true);
  };

  // Render the component
  return (
    <>
      <div className="article-root">
        <Container size="lg">
          <div className="article-inner">
            <div className="article-content">
              <div className="article-title-wrapper">
                <div className="article-title-background" />
                <Title className="article-title">
                  {/* Display the article title here */}
                  <Text
                    component="span"
                    inherit
                    variant="gradient"
                    gradient={{ from: "pink", to: "yellow" }}
                  >
                    {article?.title || "Titre de l'article"}
                  </Text>{" "}
                  {/* Maximisez la robustesse de votre système informatique ! */}
                </Title>
                {/* Display modification button for the article */}
                <div className="article-button">
                  <Button
                    variant="white"
                    color="blue"
                    onClick={handleEditContent}
                  >
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
      <Modal
        opened={editModalOpen}
        onClose={handleEditModalClose}
        title="Modifier le contenu de l'article"
      >
        <Textarea
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
          autosize
        />
        {/* Display the error message if there is one */}
        {errorMessage && <div>{errorMessage}</div>}

        <Button onClick={handleSaveChanges}>
          Enregistrer
        </Button>
      </Modal>
    </>
  );
}

export default Article;
