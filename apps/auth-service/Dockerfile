FROM node:18-alpine

WORKDIR /app

COPY apps/auth-service/package*.json ./
RUN npm install

COPY apps/auth-service/. ./
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/index.js"] 