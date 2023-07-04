import { Title, Text, Button } from '@mantine/core';
import { Paper } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../../styles/Marketing.css';
import CanOwn from '../Authorization/CanOwn';
import { GenericAction, PermissionSubject } from '../../utils/permissions';

export default function ArticleCard({ post, onEdit, onDelete }) {
  // Render the component
  const handleEdit = () => {
    onEdit(post);
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
      style={{ backgroundImage: `url(${post.imageUrl})` }}
      className="marketing-card"
    >
      <div>
        <Text className="marketing-category" size="xs">
          {post.category}
        </Text>
        <Title order={3} className="marketing-title">
          {post.title}
        </Title>
      </div>
      <div className="marketing-controlButtonsCard">
        {/* Update show more button to navigate to the corresponding page*/}
        <Link to={`/articles/${post.id}`} className="marketing-seeArticle">
          <Button variant="white" color="dark" className="marketing-viewMoreButton">
            Voir plus
          </Button>
        </Link>
        <CanOwn
          perform={GenericAction.Update}
          on={PermissionSubject.Post}
          entity={post}
          yes={
            <Button
              variant="white"
              color="blue"
              onClick={handleEdit} // Update the event handler
              className="marketing-editButton"
            >
              Modifier
            </Button>
          }
        />

        <CanOwn
          perform={GenericAction.Delete}
          on={PermissionSubject.Post}
          entity={post}
          yes={
            <Button
              variant="white"
              color="red"
              onClick={handleDeleteCard} // Update the event handler
              className="marketing-deleteButton"
            >
              Supprimer
            </Button>
          }
        />
      </div>
    </Paper>
  );
}
