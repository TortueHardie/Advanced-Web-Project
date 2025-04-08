FROM node:18-alpine As development

WORKDIR /usr/src/app

# Copier les fichiers package.json
COPY package*.json ./
COPY packages/prisma/package*.json ./packages/prisma/
COPY apps/delivery-service/package*.json ./apps/delivery-service/

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY packages/prisma ./packages/prisma
COPY apps/delivery-service ./apps/delivery-service
COPY tsconfig.json ./

# Générer le client Prisma
RUN cd packages/prisma && npx prisma generate

# Build de l'application
RUN npm run build delivery-service

FROM node:18-alpine As production

WORKDIR /usr/src/app

# Copier les fichiers package.json
COPY package*.json ./
COPY packages/prisma/package*.json ./packages/prisma/
COPY apps/delivery-service/package*.json ./apps/delivery-service/

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# Copier l'application compilée
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Exposer les ports
EXPOSE 3003
EXPOSE 4003

# Démarrer l'application
CMD ["node", "dist/apps/delivery-service/src/main.js"] 