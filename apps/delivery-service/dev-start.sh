#!/bin/bash
set -e

echo "🔧 Installation des dépendances requises..."
cd /usr/src/app
npm install --no-save tsconfig-paths@^4.2.0 @nestjs/swagger@^11.0.0 

# Générer le client Prisma
echo "🔄 Génération du client Prisma..."
if [ -d "/usr/src/app/packages/prisma" ]; then
  cd /usr/src/app/packages/prisma
  npx prisma generate
  cd /usr/src/app
fi

echo "🚀 Démarrage du service de livraison en mode développement..."
cd /usr/src/app/apps/delivery-service

# Vérifier si les node_modules existent
if [ ! -d "node_modules" ]; then
  echo "📦 Installation des dépendances du service de livraison..."
  npm install
fi

# Afficher la version de Node.js et NPM
echo "📋 Informations sur l'environnement:"
echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"

# Exécuter l'application avec ts-node
echo "💻 Exécution avec ts-node..."
NODE_PATH=/usr/src/app/node_modules:/usr/src/app/apps/delivery-service/node_modules \
npx ts-node \
  --transpile-only \
  -r tsconfig-paths/register \
  src/main.ts 