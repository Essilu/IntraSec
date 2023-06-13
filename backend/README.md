# IntraSec API

## Lancer le backend

1. Copier le fichier `.env.example` et le renommer en `.env`

```bash
cp .env.example .env
```

1. Remplir les variables d'environnement dans le fichier `.env`
    - `SESSION_SECRET` : mettez une grande chaîne de caractère aléatoire, type mot de passe
    - `DATABASE_URL` : URL de votre base de donnée

1. Installer les dépendences

```bash
npm install
```

1. Initialiser prisma

```bash
npx prisma generate
npx prisma migrate deploy
```

1. Lancer le serveur

```bash
npm run dev
```

## Modifier la base de données

Pour modifier le schéma de la base de données:

1. Modifier le fichier `./prisma/schema.prisma` selon vos besoins
1. (optionel) `npx prisma validate` pour vérifier que le schéma est valide
1. (optionel) `npx prisma format` pour formater le schéma
1. `npx prisma migrate dev --name <nom de la migration>` pour générer une migration
1. `npx prisma migrate deploy` pour appliquer la migration
