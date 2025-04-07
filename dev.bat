@echo off
echo 🚀 Démarrage de l'environnement de développement avec hot-reload...

REM Vérifier si Docker est en cours d'exécution
docker info > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ❌ Docker n'est pas en cours d'exécution. Veuillez démarrer Docker et réessayer.
  exit /b 1
)

echo ⚠️  Note pour les utilisateurs Windows:
echo   Pour de meilleures performances avec les volumes montés, nous vous recommandons d'utiliser WSL2.
echo   Si vous rencontrez des problèmes de performance, consultez: https://docs.docker.com/docker-for-windows/wsl/
echo.

REM Construire et démarrer les conteneurs en mode détaché
docker-compose -f docker-compose.dev.yml up --build -d

REM Afficher les logs en temps réel
echo 📊 Affichage des logs (Ctrl+C pour quitter sans arrêter les conteneurs)...
docker-compose -f docker-compose.dev.yml logs -f

REM Note: Pour arrêter les conteneurs manuellement:
REM docker-compose -f docker-compose.dev.yml down 