FROM node:20.11.0 as builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY packages/prisma/package*.json ./packages/prisma/
COPY apps/product-service/package*.json ./apps/product-service/

# Copy essential files
COPY tsconfig*.json ./
COPY turbo.json ./
COPY ./packages/prisma/ ./packages/prisma/

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy only the product service
COPY ./apps/product-service/ ./apps/product-service/

# Generate Prisma client
RUN npx prisma generate --schema=./packages/prisma/prisma/schema.prisma

# Create symbolic links for Prisma
RUN mkdir -p /app/apps/product-service/src/prisma
RUN ln -sf /app/packages/prisma/src/prisma.service.ts /app/apps/product-service/src/prisma/prisma.service.ts
RUN ln -sf /app/packages/prisma/src/index.ts /app/apps/product-service/src/prisma/index.ts

# Build the product service
RUN npm run build product-service

# Production stage
FROM node:20.11.0-slim

WORKDIR /app

# Copy Prisma client and schema
COPY --from=builder /app/packages/prisma/prisma ./packages/prisma/prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy package files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/product-service/package*.json ./apps/product-service/

# Copy built application
COPY --from=builder /app/dist/apps/product-service ./dist

# Install only production dependencies
RUN npm install --only=production --legacy-peer-deps

# Expose service ports
EXPOSE 3002
EXPOSE 4002

# Start the service
CMD ["node", "dist/main.js"] 