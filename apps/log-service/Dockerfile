FROM node:18-alpine

WORKDIR /app

# Copier le package.json du log-service
COPY apps/log-service/package.json .

# Installer les dépendances
RUN npm install

# Copier le code source
COPY apps/log-service/src ./src
COPY apps/log-service/tsconfig*.json .
COPY apps/log-service/nest-cli.json .

# Construire l'application
RUN npm run build

EXPOSE 3002

CMD ["node", "dist/main.js"] 