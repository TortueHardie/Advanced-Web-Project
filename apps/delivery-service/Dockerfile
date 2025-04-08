FROM node:18-alpine As development

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY packages/prisma/package*.json ./packages/prisma/
COPY packages/discovery/package*.json ./packages/discovery/
COPY apps/delivery-service/package*.json ./apps/delivery-service/

# Install dependencies
RUN npm ci

# Copy source code
COPY packages/prisma ./packages/prisma
COPY packages/discovery ./packages/discovery
COPY apps/delivery-service ./apps/delivery-service
COPY tsconfig.json ./
COPY tsconfig.build.json ./

# Generate Prisma client
RUN cd packages/prisma && npx prisma generate

# Build application
RUN npm run build delivery-service

FROM node:18-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY packages/prisma/package*.json ./packages/prisma/
COPY packages/discovery/package*.json ./packages/discovery/
COPY apps/delivery-service/package*.json ./apps/delivery-service/

# Install only production dependencies
RUN npm ci --only=production

# Copy built application
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/packages/prisma/dist ./packages/prisma/dist
COPY --from=development /usr/src/app/packages/discovery/dist ./packages/discovery/dist
COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Copier notre script de démarrage
COPY apps/delivery-service/start.sh ./apps/delivery-service/start.sh
RUN chmod +x ./apps/delivery-service/start.sh

# Configure environment and expose port
ENV PORT=3003
EXPOSE ${PORT}
EXPOSE 4003

# Start the application
CMD ["sh", "./apps/delivery-service/start.sh"] 