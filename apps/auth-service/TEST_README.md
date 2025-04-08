# Tests des Routes d'Authentification

Ce répertoire contient des scripts pour tester toutes les routes du service d'authentification.

## Prérequis

- Node.js doit être installé sur votre système
- Le service d'authentification doit être en cours d'exécution
- Le service utilisateur doit être en cours d'exécution (pour l'inscription et la connexion)

## Configuration

Assurez-vous que les variables d'environnement sont correctement configurées :

- `AUTH_SERVICE_URL` : URL du service d'authentification (par défaut : http://localhost:3000)
- `USER_SERVICE_URL` : URL du service utilisateur (par défaut : http://localhost:3001)

Ces variables peuvent être définies dans le fichier `.env` du service d'authentification.

## Exécution des tests

### Pour les utilisateurs Windows

```bash
# Depuis PowerShell
./test-auth-routes.ps1
```

### Pour les utilisateurs Linux/Mac

```bash
# Rendre les scripts exécutables
chmod +x test-auth-routes.sh
chmod +x test-auth-routes.js

# Exécuter le script
./test-auth-routes.sh
```

### Exécution directe avec Node.js

```bash
node test-auth-routes.js
```

## Tests d'intégration avec Jest

Un fichier de test Jest est également disponible pour des tests plus complets :

```bash
# Installer les dépendances
npm install

# Exécuter les tests Jest
npm test -- -t "Tests fonctionnels des routes d'authentification"
```

## Routes testées

Le script teste les routes suivantes :

1. `POST /auth/register` - Inscription d'un nouvel utilisateur
2. `POST /auth/login` - Connexion avec un utilisateur existant
3. `POST /auth/verify` - Vérification d'un token JWT
4. `POST /auth/refresh` - Rafraîchissement d'un token expiré
5. `POST /auth/revoke` - Révocation d'un token JWT

## Analyse des résultats

Le script affiche les résultats de chaque test avec :
- La méthode HTTP utilisée
- La route testée
- Le code de statut retourné
- Un indicateur de succès (vert) ou d'échec (rouge)

En cas d'erreur, des informations supplémentaires sont affichées pour faciliter le débogage.

## Nettoyage

Le script tente de supprimer l'utilisateur de test créé pendant les tests, mais cela dépend de la disponibilité d'une route de suppression dans le service utilisateur. 