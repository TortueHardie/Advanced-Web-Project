#!/bin/bash

# Script de démarrage pour le service de livraison
echo "Démarrage du service de livraison..."

# Déterminer le chemin d'accès au point d'entrée en fonction de l'environnement
if [ -f "/usr/src/app/dist/apps/delivery-service/src/main.js" ]; then
  # En production, utiliser le fichier JavaScript compilé
  echo "Mode production détecté, utilisation du fichier compilé"
  node /usr/src/app/dist/apps/delivery-service/src/main.js
elif [ -f "/usr/src/app/apps/delivery-service/dist/main.js" ]; then
  # Structure alternative 
  echo "Structure de build alternative détectée"
  node /usr/src/app/apps/delivery-service/dist/main.js
else
  # En développement, utiliser ts-node-dev pour le hot reloading
  echo "Mode développement détecté, démarrage avec ts-node-dev"
  cd /usr/src/app/apps/delivery-service
  npx ts-node-dev --respawn --transpile-only src/main.ts
fi 