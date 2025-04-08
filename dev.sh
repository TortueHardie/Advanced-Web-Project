#!/bin/bash

echo "🚀 Démarrage de l'environnement de développement avec hot-reload..."

# Vérifier si Docker est en cours d'exécution
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker n'est pas en cours d'exécution. Veuillez démarrer Docker et réessayer."
  exit 1
fi

# Conseil pour les utilisateurs Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  echo "⚠️  Note pour les utilisateurs Windows:"
  echo "  Pour de meilleures performances avec les volumes montés, nous vous recommandons d'utiliser WSL2."
  echo "  Si vous rencontrez des problèmes de performance, consultez: https://docs.docker.com/docker-for-windows/wsl/"
  echo ""
fi

# Construire et démarrer les conteneurs en mode détaché
docker-compose -f docker-compose.dev.yml up --build -d

# Afficher les logs en temps réel
echo "📊 Affichage des logs (Ctrl+C pour quitter sans arrêter les conteneurs)..."
docker-compose -f docker-compose.dev.yml logs -f

# Note: Pour arrêter les conteneurs manuellement:
# docker-compose -f docker-compose.dev.yml down 