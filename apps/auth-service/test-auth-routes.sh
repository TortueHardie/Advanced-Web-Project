#!/bin/bash

# Définir des couleurs pour la sortie
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== DÉMARRAGE DES TESTS DES ROUTES D'AUTHENTIFICATION ===${NC}"
echo -e "${YELLOW}Assurez-vous que le service d'authentification est en cours d'exécution${NC}"
echo

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js n'est pas installé. Veuillez l'installer pour exécuter ce script.${NC}"
    exit 1
fi

# Rendre le script JavaScript exécutable
chmod +x test-auth-routes.js

# Exécuter le script JavaScript
node test-auth-routes.js

# Vérifier le code de sortie
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Tests terminés avec succès${NC}"
else
    echo -e "${RED}Des erreurs se sont produites pendant les tests${NC}"
fi 