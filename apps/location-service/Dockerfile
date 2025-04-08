FROM node:20-alpine

# Install OpenSSL
RUN apk add --no-cache openssl openssl-dev

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.json ./
COPY .env ./

# Copy source code
COPY packages ./packages
COPY apps/location-service ./apps/location-service

# Install dependencies
RUN npm install --legacy-peer-deps
RUN cd apps/location-service && npm install --legacy-peer-deps

# Install TypeScript globally
RUN npm install -g typescript@4.7.4

# Generate Prisma client
RUN cd packages/prisma && npx prisma generate

# Build shared packages and location service
RUN npm run build -w @advanced-web/prisma && \
    npm run build -w @advanced-web/discovery && \
    npm run build -w location-service

# Set up dist directory
WORKDIR /app/dist/apps/location-service

# Copy package.json and install dependencies in dist directory
RUN cp /app/apps/location-service/package.json . && \
    mkdir -p node_modules/@advanced-web && \
    cp -r /app/packages/prisma node_modules/@advanced-web/ && \
    cp -r /app/packages/discovery node_modules/@advanced-web/ && \
    cp -r /app/node_modules/@prisma node_modules/ && \
    cp -r /app/node_modules/.prisma node_modules/ && \
    npm install --legacy-peer-deps && \
    npm install class-transformer@^0.5.1 --legacy-peer-deps

# Debug: List contents
RUN echo "Listing current directory:" && \
    ls -la && \
    echo "Listing node_modules directory:" && \
    ls -la node_modules/@prisma

# Expose port
EXPOSE 3003

# Start the service
CMD ["node", "main"] 