import { createStyles, Container, Title, Text, Button, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage:
      'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80)',
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.dark,
    opacity: 0.75,
    maxWidth: rem(500),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },
}));

export default function Article() {
  const { classes } = useStyles();
    return (
    <>
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                Audit et Sécurité Offensive
              </Text>{' '}
              Maximisez la robustesse de votre système informatique !
            </Title>

            
          </div>
        </div>
          </Container>
            </div>
        <div>
            <Text className={classes.description} mt={30}>
                Chez SecureCorp, nous comprenons l'importance critique d'une sécurité informatique solide pour protéger vos précieuses données et assurer la continuité de votre activité. C'est pourquoi nous vous offrons notre expertise en matière d'Audit et Sécurité Offensive pour évaluer et renforcer la résistance de votre infrastructure informatique.

Notre équipe de consultants expérimentés en sécurité informatique est dévouée à identifier les vulnérabilités potentielles et les points faibles de votre système. Grâce à notre approche méthodique et rigoureuse, nous effectuons des tests approfondis, y compris des tentatives d'intrusion contrôlées, pour détecter les éventuelles failles de sécurité et les exploiter avant que les acteurs malveillants ne le fassent.

En collaborant étroitement avec votre entreprise, nous élaborons des stratégies personnalisées et des recommandations concrètes pour renforcer votre posture de sécurité. Que ce soit en identifiant les lacunes dans votre architecture réseau, en évaluant vos politiques de sécurité ou en effectuant des audits de conformité, nous sommes là pour vous aider à anticiper les menaces et à mettre en place des mesures préventives adaptées.

Notre service d'Audit et Sécurité Offensive vise à vous offrir une tranquillité d'esprit totale en sachant que votre système informatique est protégé contre les attaques potentielles. En renforçant vos défenses, nous minimisons les risques de perturbation des opérations, de vol de données confidentielles ou de réputation endommagée.

Choisir SecureCorp, c'est opter pour une approche proactive en matière de sécurité informatique. Avec notre expertise avancée et notre souci du détail, nous vous garantissons une évaluation complète de vos vulnérabilités, des recommandations adaptées à votre environnement spécifique et une assistance continue pour maintenir votre système à l'abri des menaces en constante évolution.

Protégez votre entreprise, votre réputation et la confiance de vos clients en faisant confiance à SecureCorp pour votre Audit et Sécurité Offensive. Contactez-nous dès maintenant pour une consultation personnalisée et prenez les devants dans le domaine de la sécurité informatique. Votre tranquillité d'esprit n'a pas de prix ! 
            </Text> 
        </div>
    </>
  );
}