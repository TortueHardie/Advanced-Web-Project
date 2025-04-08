#!/bin/bash

# Script de démarrage pour l'API Gateway
# - Génère les certificats SSL si nécessaire
# - Démarre l'application NestJS
# - Démarre NGINX comme proxy inverse

set -e

# Vérifier si les certificats SSL existent déjà
if [ ! -f /etc/nginx/ssl/server.crt ] || [ ! -f /etc/nginx/ssl/server.key ] || [ ! -f /etc/nginx/ssl/dhparam.pem ]; then
    echo "Certificats SSL ou paramètres DH manquants. Génération en cours..."
    /usr/local/bin/generate-ssl-certs.sh
fi

# Vérifier si nous sommes en mode production ou développement
if [ "$NODE_ENV" = "production" ]; then
    echo "Démarrage en mode PRODUCTION"
    
    # Copier les fichiers d'application et compiler si nécessaire (en mode production)
    if [ ! -d "/usr/src/app/apps/api-gateway/dist" ]; then
        echo "Compilation de l'application en mode production..."
        cd /usr/src/app
        npm run build --workspace=apps/api-gateway
    fi
    
    # Démarrer NGINX en arrière-plan
    echo "Démarrage de NGINX..."
    nginx -g "daemon off;" &
    NGINX_PID=$!
    
    # Démarrer l'application NestJS en mode production
    echo "Démarrage de l'application NestJS en mode production..."
    cd /usr/src/app/apps/api-gateway
    node dist/main.js &
    APP_PID=$!
else
    echo "Démarrage en mode DÉVELOPPEMENT"
    
    # Démarrer NGINX en arrière-plan
    echo "Démarrage de NGINX..."
    nginx -g "daemon off;" &
    NGINX_PID=$!
    
    # Démarrer l'application NestJS en mode développement
    echo "Démarrage de l'application NestJS en mode développement..."
    cd /usr/src/app/apps/api-gateway
    npx ts-node-dev --respawn --transpile-only src/main.ts &
    APP_PID=$!
fi

# Fonction pour arrêter proprement les processus
cleanup() {
    echo "Arrêt des services..."
    kill -TERM $APP_PID
    kill -TERM $NGINX_PID
    wait $APP_PID
    wait $NGINX_PID
    echo "Services arrêtés."
    exit 0
}

# Capturer les signaux pour arrêter proprement
trap cleanup SIGINT SIGTERM

# Attendre que l'un des processus se termine
wait -n
# Si l'un des processus se termine, arrêter l'autre aussi
cleanup 