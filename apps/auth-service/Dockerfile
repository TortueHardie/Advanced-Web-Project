FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY turbo.json ./
COPY apps/auth-service/package*.json ./apps/auth-service/

# Installer les dépendances
RUN npm install

# Copier le code source
COPY apps/auth-service ./apps/auth-service

# Construire l'application
WORKDIR /app/apps/auth-service
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"] 