FROM node:18-slim AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl libssl-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./
COPY turbo.json ./

# Copy workspace configurations
COPY apps/order-service/package*.json ./apps/order-service/
COPY packages/prisma/package*.json ./packages/prisma/

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Generate Prisma client
RUN cd packages/prisma && npx prisma generate

# Build the application
RUN npm run build --workspace=order-service

# Production stage
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./
COPY turbo.json ./

# Copy workspace configurations
COPY apps/order-service/package*.json ./apps/order-service/
COPY packages/prisma/package*.json ./packages/prisma/

# Install production dependencies only
RUN npm ci --production

# Copy built application from builder stage
COPY --from=builder /app/apps/order-service/dist ./apps/order-service/dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy Prisma schema
COPY packages/prisma/prisma ./packages/prisma/prisma

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 3003

# Command to run the application
CMD ["node", "apps/order-service/dist/main.js"] 