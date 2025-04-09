#!/bin/sh

# Créer le répertoire pour les fichiers PID si nécessaire
mkdir -p /run/nginx

# Vérifier si node_modules existe et contient les dépendances essentielles de NestJS
if [ ! -d "/app/node_modules/@nestjs/core" ] || [ ! -d "/app/node_modules/express" ]; then
  echo "Dépendances NestJS manquantes. Installation complète des dépendances..."
  cd /app && npm install --legacy-peer-deps
  
  # Vérifier si l'installation a réussi
  if [ ! -d "/app/node_modules/@nestjs/core" ]; then
    echo "Échec de l'installation des dépendances NestJS. Vérifiez votre package.json."
    exit 1
  fi
fi

# Démarrer Nginx avec vérification de la configuration
echo "Vérification de la configuration Nginx..."
nginx -t

if [ $? -ne 0 ]; then
  echo "Configuration Nginx invalide. Arrêt du conteneur."
  exit 1
fi

echo "Démarrage de Nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

# Attendre un peu que Nginx démarre
sleep 2

# Vérifier si Nginx est en cours d'exécution
if ! kill -0 $NGINX_PID 2>/dev/null; then
  echo "Nginx n'a pas démarré correctement. Arrêt du conteneur."
  exit 1
fi

echo "Nginx démarré sur le port 80 (PID: $NGINX_PID)"

# Aller dans le répertoire de l'application
cd /app

echo "Démarrage de l'application NestJS..."
# Démarrer l'application NestJS
node main.js &
NODE_PID=$!

# Attendre un moment pour s'assurer que l'application démarre
sleep 5

# Vérifier si l'application est en cours d'exécution
if ! kill -0 $NODE_PID 2>/dev/null; then
  echo "Application NestJS n'a pas démarré correctement. Arrêt du conteneur."
  kill $NGINX_PID 2>/dev/null || true
  exit 1
fi

echo "Application NestJS démarrée avec succès (PID: $NODE_PID)"
echo "API Gateway prête à recevoir des requêtes"

# Attendre que l'un des processus se termine
wait -n

# Si l'un des processus se termine, terminer l'autre proprement
if kill -0 $NGINX_PID 2>/dev/null; then
  echo "L'application NestJS s'est arrêtée, arrêt de Nginx..."
  kill $NGINX_PID 2>/dev/null || true
else
  echo "Nginx s'est arrêté, arrêt de l'application NestJS..."
  kill $NODE_PID 2>/dev/null || true
fi

echo "API Gateway arrêtée"
exit 1 