import { Title, Text, Button } from '@mantine/core';
import { Paper } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../../styles/Marketing.css';

export default function ArticleCard({ id, imageUrl, title, category, content, onEdit, onDelete }) {
  // Render the component
  const handleEdit = () => {
    onEdit({ id, imageUrl, title, category, content });
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
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="marketing-card"
    >
      <div>
        <Text className="marketing-category" size="xs">
          {category}
        </Text>
        <Title order={3} className="marketing-title">
          {title}
        </Title>
      </div>
      <div className="marketing-controlButtonsCard">
        {/* Update show more button to navigate to the corresponding page*/}
        <Link to={`/articles/${id}`} className="marketing-seeArticle">
          <Button variant="white" color="dark" className="marketing-viewMoreButton">
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
