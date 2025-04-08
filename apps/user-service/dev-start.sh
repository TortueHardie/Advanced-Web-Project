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
  
  # Exécuter les migrations Prisma pour créer/mettre à jour les tables
  echo "📊 Exécution des migrations Prisma..."
  npx prisma migrate dev --name init --skip-generate
  # Si la commande ci-dessus échoue, essayons de forcer la création des tables
  if [ $? -ne 0 ]; then
    echo "Migration échouée, tentative de création directe des tables via db push..."
    npx prisma db push --accept-data-loss
  fi
  
  cd /usr/src/app
fi

echo "🚀 Démarrage du service utilisateur en mode développement..."
cd /usr/src/app/apps/user-service

# Vérifier si les node_modules existent
if [ ! -d "node_modules" ]; then
  echo "📦 Installation des dépendances du service utilisateur..."
  npm install
fi

# Afficher la version de Node.js et NPM
echo "📋 Informations sur l'environnement:"
echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"

# Afficher l'URL de la base de données (masquée)
echo "Base de données: ${DATABASE_URL//:*/:[HIDDEN_PASSWORD]@*}"

# Tester la connexion à la base de données
echo "🔍 Test de connexion à la base de données..."
pg_host=$(echo $DATABASE_URL | grep -oP '(?<=@)[^:]+(?=:)')
pg_port=$(echo $DATABASE_URL | grep -oP '(?<=:)[0-9]+(?=/)')
echo "Tentative de connexion à $pg_host:$pg_port..."
timeout 5 bash -c "cat < /dev/null > /dev/tcp/$pg_host/$pg_port" 2>/dev/null && 
  echo "✅ Connexion à la base de données réussie!" ||
  echo "❌ Échec de connexion à la base de données!"

# Exécuter l'application avec ts-node
echo "💻 Exécution avec ts-node..."
NODE_PATH=/usr/src/app/node_modules:/usr/src/app/apps/user-service/node_modules \
npx ts-node \
  --transpile-only \
  -r tsconfig-paths/register \
  src/main.ts 