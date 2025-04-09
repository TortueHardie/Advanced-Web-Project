FROM node:18-alpine

WORKDIR /usr/src/app

# Copier les fichiers package.json
COPY package*.json ./
COPY packages/prisma/package*.json ./packages/prisma/
COPY apps/delivery-service/package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le code source
COPY packages/prisma ./packages/prisma
COPY apps/delivery-service ./apps/delivery-service
COPY tsconfig.json ./
COPY turbo.json ./

# Générer le client Prisma
RUN npx prisma generate --schema=./packages/prisma/prisma/schema.prisma

# Build de l'application
RUN npm run build delivery-service

# Exposer les ports
EXPOSE 3003
EXPOSE 4003

# Démarrer l'application
CMD ["node", "dist/apps/delivery-service/src/main.js"] 