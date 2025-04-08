FROM node:20-alpine as build

WORKDIR /app

# Copier les fichiers package.json
COPY package*.json ./
COPY apps/log-service/package*.json ./apps/log-service/

# Installer les dépendances
RUN npm ci --only=production --ignore-scripts

# Copier le code source
COPY apps/log-service ./apps/log-service

# Compiler le code TypeScript
WORKDIR /app/apps/log-service
RUN npm run build

# Image finale
FROM node:20-alpine

WORKDIR /app

# Copier les dépendances et le code compilé
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/log-service/dist ./dist
COPY --from=build /app/apps/log-service/package*.json ./

# Exposition du port
EXPOSE 3004

# Définir les variables d'environnement
ENV NODE_ENV=production

# Commande pour démarrer l'application
CMD ["node", "dist/index.js"] 