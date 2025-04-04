FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de configuration racine
COPY package*.json ./
COPY turbo.json ./

# Copier les fichiers du service de produits
COPY apps/product-service/package*.json ./apps/product-service/
COPY apps/product-service/tsconfig*.json ./apps/product-service/

# Copier les packages partagés
COPY packages/discovery/package*.json ./packages/discovery/
COPY packages/discovery/tsconfig*.json ./packages/discovery/
COPY packages/prisma/package*.json ./packages/prisma/
COPY packages/prisma/tsconfig*.json ./packages/prisma/

# Installer les dépendances
RUN npm install -g rimraf @nestjs/cli
RUN npm install

# Copier le code source des packages partagés
COPY packages/discovery/src ./packages/discovery/src
COPY packages/prisma/src ./packages/prisma/src

# Construire les packages partagés
RUN npm run build --workspace=packages/discovery
RUN npm run build --workspace=packages/prisma

# Copier le code source du service
COPY apps/product-service/src ./apps/product-service/src

# Construire le service
RUN npm run build --workspace=apps/product-service

WORKDIR /app/apps/product-service

EXPOSE 3001

CMD ["npm", "run", "start:prod"] 