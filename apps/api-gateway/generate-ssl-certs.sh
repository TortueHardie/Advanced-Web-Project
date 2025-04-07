#!/bin/bash

# Ce script génère des certificats SSL auto-signés pour le développement 
# et les paramètres Diffie-Hellman pour une sécurité renforcée

set -e

# Créer le répertoire pour les certificats s'il n'existe pas
mkdir -p /etc/nginx/ssl

# Générer les paramètres Diffie-Hellman (cela peut prendre quelque temps)
echo "Génération des paramètres Diffie-Hellman (2048 bits)..."
openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048

# Générer la clé privée
echo "Génération de la clé privée..."
openssl genrsa -out /etc/nginx/ssl/server.key 2048

# Générer le certificat auto-signé
echo "Génération du certificat auto-signé..."
openssl req -new -key /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.csr -subj "/C=FR/ST=France/L=Paris/O=Development/CN=localhost"
openssl x509 -req -days 365 -in /etc/nginx/ssl/server.csr -signkey /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt

# Définir les permissions correctes
chmod 600 /etc/nginx/ssl/server.key
chmod 644 /etc/nginx/ssl/server.crt
chmod 644 /etc/nginx/ssl/dhparam.pem

echo "Certificats SSL et paramètres DH générés avec succès!"
echo "  - Certificat: /etc/nginx/ssl/server.crt"
echo "  - Clé privée: /etc/nginx/ssl/server.key"
echo "  - Paramètres DH: /etc/nginx/ssl/dhparam.pem" 