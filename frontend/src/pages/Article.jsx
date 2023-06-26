/* eslint-disable react/no-unescaped-entities */
import { Container, Title, Text, Button, Modal, Textarea } from "@mantine/core";
import { useState, useEffect } from "react";
import "../styles/Article.css";

function Article() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Simulate fetching the article content from the server
    setTimeout(() => {
      setEditedContent({
        title: "Audit et Sécurité Offensive",
        body: `Chez SecureCorp, nous comprenons l'importance critique d'une sécurité informatique solide pour protéger vos précieuses données et assurer la continuité de votre activité. C'est pourquoi nous vous offrons notre expertise en matière d'Audit et Sécurité Offensive pour évaluer et renforcer la résistance de votre infrastructure informatique.

        Notre équipe de consultants expérimentés en sécurité informatique est dévouée à identifier les vulnérabilités potentielles et les points faibles de votre système. Grâce à notre approche méthodique et rigoureuse, nous effectuons des tests approfondis, y compris des tentatives d'intrusion contrôlées, pour détecter les éventuelles failles de sécurité et les exploiter avant que les acteurs malveillants ne le fassent.

        En collaborant étroitement avec votre entreprise, nous élaborons des stratégies personnalisées et des recommandations concrètes pour renforcer votre posture de sécurité. Que ce soit en identifiant les lacunes dans votre architecture réseau, en évaluant vos politiques de sécurité ou en effectuant des audits de conformité, nous sommes là pour vous aider à anticiper les menaces et à mettre en place des mesures préventives adaptées.

        Notre service d'Audit et Sécurité Offensive vise à vous offrir une tranquillité d'esprit totale en sachant que votre système informatique est protégé contre les attaques potentielles. En renforçant vos défenses, nous minimisons les risques de perturbation des opérations, de vol de données confidentielles ou de réputation endommagée.

        Choisir SecureCorp, c'est opter pour une approche proactive en matière de sécurité informatique. Avec notre expertise avancée et notre souci du détail, nous vous garantissons une évaluation complète de vos vulnérabilités, des recommandations adaptées à votre environnement spécifique et une assistance continue pour maintenir votre système à l'abri des menaces en constante évolution.

        Protégez votre entreprise, votre réputation et la confiance de vos clients en faisant confiance à SecureCorp pour votre Audit et Sécurité Offensive. Contactez-nous dès maintenant pour une consultation personnalisée et prenez les devants dans le domaine de la sécurité informatique. Votre tranquillité d'esprit n'a pas de prix !`,
      });
    }, 500);
  }, []);

  // Event handlers for opening the edit and info modals
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setErrorMessage("");
  };

  // Event handler for saving the changes
  const handleSaveChanges = (newContent) => {
    if (validateContent(newContent)) {
      // Effectuer les actions de sauvegarde ici
      setEditModalOpen(false);
      setErrorMessage("");
      console.log(newContent);
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
    }
  };

  // Event handler for opening the edit modal
  const handleEditContent = () => {
    setEditModalOpen(true);
  };

  // Validate the content of the article
  const validateContent = (content) => {
    return content?.title && content?.body;
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
                    {editedContent?.title || "Titre de l'article"}
                  </Text>{" "}
                  Maximisez la robustesse de votre système informatique !
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
          <Text>{editedContent?.body}</Text>
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
          value={editedContent?.title || ""}
          onChange={(event) =>
            setEditedContent({ ...editedContent, title: event.target.value })
          }
          required
        />

        <Textarea
          label="Corps de l'article"
          placeholder="Contenu de l'article"
          value={editedContent?.body || ""}
          onChange={(event) =>
            setEditedContent({ ...editedContent, body: event.target.value })
          }
          required
          rows={10}
        />

        {/* Display the error message if there is one */}
        {errorMessage && <div>{errorMessage}</div>}

        <Button onClick={() => handleSaveChanges(editedContent)}>
          Enregistrer
        </Button>
      </Modal>
    </>
  );
}

export default Article;
