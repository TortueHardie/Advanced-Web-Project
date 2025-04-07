FROM node:18-alpine

# Installer les dépendances nécessaires pour Prisma
RUN apk add --no-cache openssl openssl-dev

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY turbo.json ./
COPY apps/product-service/package*.json ./apps/product-service/
COPY packages/discovery/package*.json ./packages/discovery/
COPY packages/prisma/package*.json ./packages/prisma/

# Copier les fichiers de configuration TypeScript
COPY packages/discovery/tsconfig*.json ./packages/discovery/
COPY packages/prisma/tsconfig*.json ./packages/prisma/
COPY apps/product-service/tsconfig*.json ./apps/product-service/

# Installer les dépendances globales
RUN npm install -g @nestjs/cli rimraf

# Installer les dépendances
RUN npm install

# Copier le code source et les fichiers de configuration
COPY packages/discovery/src ./packages/discovery/src
COPY packages/prisma/src ./packages/prisma/src
COPY packages/prisma/prisma ./packages/prisma/prisma
COPY packages/prisma/.env ./packages/prisma/
COPY apps/product-service/src ./apps/product-service/src

# Construire les packages partagés
WORKDIR /app/packages/discovery
RUN npm run build

# Générer le client Prisma et construire le package
WORKDIR /app/packages/prisma
RUN npx prisma generate
RUN npm run build

# Lier les packages localement
WORKDIR /app
RUN npm link ./packages/discovery
RUN npm link ./packages/prisma

# Construire l'application
WORKDIR /app/apps/product-service
RUN npm run build

# Exposer le port
EXPOSE 3002

# Démarrer l'application
CMD ["npm", "run", "start:prod"] 