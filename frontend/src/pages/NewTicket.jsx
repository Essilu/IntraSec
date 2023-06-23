import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  rem,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';

// Define the component's styles using the createStyles function
const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: 'border-box',
    margin: 30,
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    borderRadius: theme.radius.md,
    padding: `calc(${theme.spacing.xl} * 2.5)`,

    [theme.fn.smallerThan('sm')]: {
      padding: `calc(${theme.spacing.xl} * 1.5)`,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: rem(300),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

// Define an array of social icons
const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

// Define the ContactUs component
export default function ContactUs() {
  const { classes } = useStyles();

  // Generate the social icons using the map function
  const icons = social.map((Icon, index) => (
    <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
      {/* Icon component */}
    </ActionIcon>
  ));

  return (
    <div className={classes.wrapper}>
      {/* A SimpleGrid component with 2 columns, responsive to smaller screens */}
      <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <div>
          {/* Title component for the form */}
          <Title className={classes.title}>Ouvrir un nouveau ticket</Title>
          {/* Description text for the form */}
          <Text className={classes.description} mt="sm" mb={30}>
            {/* Description content */}
          </Text>

          {/* Group component containing additional information */}
          <Group mt="xl">
            <Text color="white">Nos équipes travaillent tous les jours pour régler vos problèmes. Contactez-nous et nous vous répondrons dans les plus brefs délais.</Text>
          </Group>
        </div>
        <div className={classes.form}>
          {/* TextInput component for the ticket title */}
          <TextInput
            label="Intitulé du ticket"
            placeholder="Ex: Problème de facturation"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          {/* TextInput component for the user's name */}
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          {/* Textarea component for the message */}
          <Textarea
            required
            label="Your message"
            placeholder="N'hésitez pas à décrire comme reproduire le problème rencontré, ainsi que les étapes pour le reproduire."
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />

          {/* Group component for the submit button */}
          <Group position="right" mt="md">
            <Button className={classes.control}>Poster le ticket.</Button>
          </Group>
        </div>
      </SimpleGrid>
    </div>
  );
}
