@echo off
echo Reconstruction des images Docker avec les nouvelles configurations...

echo Arrêt des conteneurs existants...
docker-compose -f docker-compose.dev.yml down

echo Suppression des images existantes...
docker rmi advanced-web-project-api-gateway:latest advanced-web-project-auth-service:latest advanced-web-project-user-service:latest advanced-web-project-log-service:latest advanced-web-project-order-service:latest advanced-web-project-frontend:latest 2>nul

echo Voulez-vous utiliser la configuration simplifiée avec montage des dossiers complets? (O/N)
set /p CONFIG=

if /i "%CONFIG%"=="O" (
  echo Reconstruction et démarrage des conteneurs avec la configuration simplifiée...
  docker-compose -f docker-compose.simplified.yml up --build -d
  echo Les services devraient maintenant démarrer. Logs:
  docker-compose -f docker-compose.simplified.yml logs -f
) else (
  echo Reconstruction et démarrage des conteneurs avec la configuration standard...
  docker-compose -f docker-compose.dev.yml up --build -d
  echo Les services devraient maintenant démarrer. Logs:
  docker-compose -f docker-compose.dev.yml logs -f
) 