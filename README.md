# Advanced Web Project - Architecture Microservices

Ce projet implémente une plateforme de livraison de repas avec une architecture microservices. Il permet aux utilisateurs de commander des repas auprès de restaurants partenaires et de suivre leurs commandes en temps réel.

## 🚀 Architecture globale

Le projet est structuré comme une application monorepo composée de plusieurs microservices indépendants communiquant entre eux. Cette architecture permet une meilleure scalabilité, résilience et facilite le développement parallèle.

### Microservices
- **API Gateway** : Point d'entrée unique pour toutes les requêtes client
- **User Service** : Gestion des utilisateurs et authentification
- **Auth Service** : Gestion des JWT et tokens d'authentification
- **Order Service** : Gestion des commandes
- **Log Service** : Centralisation des logs système
- **Frontend** : Application client

### Technologies principales
- **Backend** : NestJS, TypeScript, Prisma ORM
- **Base de données** : PostgreSQL
- **Documentation API** : Swagger
- **Conteneurisation** : Docker, Docker Compose
- **Communication** : HTTP REST, TCP (microservices)

## 📊 Modèle de données

Le projet utilise un modèle de données qui comprend les entités principales suivantes :

- **User** : Utilisateurs de la plateforme (clients, livreurs, restaurateurs, administrateurs)
- **Restaurant** : Établissements proposant des plats à livrer
- **Menu** : Collections d'articles proposés par les restaurants
- **Article** : Plats individuels disponibles à la commande
- **Order** : Commandes passées par les utilisateurs
- **OrderItem** : Articles spécifiques inclus dans une commande

## 🔐 Authentification et Autorisation

Le système utilise l'authentification par JWT (JSON Web Tokens) :

1. **Obtention d'un token** :
   - Créez un compte avec `/auth/register` ou connectez-vous avec `/auth/login`
   - Ces endpoints vous renverront un `accessToken` et un `refreshToken`

2. **Utilisation des routes protégées** :
   - Incluez le header `Authorization: Bearer {votre_access_token}` dans vos requêtes
   - Toutes les routes des services utilisateur et commandes (sauf la création d'utilisateur) nécessitent une authentification

3. **Rafraîchissement d'un token expiré** :
   - Lorsque votre `accessToken` expire (après 15 minutes), utilisez `/auth/refresh` avec votre `refreshToken`
   - Vous recevrez une nouvelle paire de tokens

4. **Révocation d'un token** :
   - Pour la déconnexion sécurisée, utilisez `/auth/revoke` avec votre `accessToken`

## 📄 Routes API

### API Gateway
- `GET /docs` - Documentation Swagger centralisée de l'API Gateway

### Authentification (Auth Service)
- `POST /auth/login` - Connexion utilisateur
- `POST /auth/register` - Inscription utilisateur
- `POST /auth/verify` - Vérification de la validité d'un token JWT
- `POST /auth/refresh` - Rafraîchissement d'un token expiré
- `POST /auth/revoke` - Révocation d'un token

### Utilisateurs (User Service)
- `POST /users` - Créer un nouvel utilisateur
- `GET /users` - Récupérer tous les utilisateurs (authentification requise)
- `GET /users/:id` - Récupérer un utilisateur par ID (authentification requise)
- `PUT /users/:id` - Mettre à jour un utilisateur (authentification requise)
- `DELETE /users/:id` - Supprimer un utilisateur (authentification requise)
- `POST /users/validate` - Valider les identifiants utilisateur (utilisé par le service d'authentification)
- `GET /users/by-email/:email` - Récupérer un utilisateur par email (authentification requise)

### Commandes (Order Service)
- `POST /orders` - Créer une nouvelle commande (authentification requise)
- `GET /orders/me` - Récupérer les commandes de l'utilisateur connecté (authentification requise)
- `GET /orders/admin` - Récupérer toutes les commandes (rôle admin/restaurant requis)
- `GET /orders/:orderId` - Récupérer les détails d'une commande (authentification requise)
- `PUT /orders/:orderId/cancel` - Annuler une commande (authentification requise)

### Logs (Log Service)
- `GET /health` - Vérifier l'état du service de logs
- `POST /logs` - Enregistrer un nouveau message de log
- `GET /logs` - Récupérer les messages de logs (pagination supportée)

## 🏁 Installation et démarrage

### Prérequis
- Docker et Docker Compose installés
- Node.js (v16+) et npm (pour le développement local)
- Pour les utilisateurs Windows: WSL2 recommandé pour de meilleures performances

### Démarrage rapide

```sh
# Cloner le dépôt
git clone <repository-url>
cd advanced-web-project

# Configurer les variables d'environnement
cp .env.example .env
# Modifiez le fichier .env selon vos besoins

# Lancer les services en mode développement
npm run start

# OU en utilisant les scripts shell/batch
# Sur Linux/macOS
./dev.sh

# Sur Windows
.\dev.bat
```

### Version simplifiée pour le développement

Pour un démarrage rapide avec moins de services:

```bash
# Démarrer uniquement les services essentiels
docker-compose -f docker-compose.simplified.yml up -d
```

### Reconstruction complète après modifications des Dockerfiles

Si vous avez modifié les Dockerfiles ou rencontrez des problèmes de dépendances, utilisez le script de reconstruction:

```bash
# Sur Windows
.\rebuild.bat

# Sur Linux/macOS (équivalent manuel)
docker-compose -f docker-compose.dev.yml down
docker rmi $(docker images -q 'advanced-web-project-*:latest')
docker-compose -f docker-compose.dev.yml up --build -d
```

## 🔍 Accès aux services

Une fois les services démarrés, vous pouvez accéder aux différentes interfaces :

- **API Gateway Swagger** : http://localhost:3000/docs
- **User Service Swagger** : 
  - Via proxy : http://localhost:3000/api-docs/user
  - Direct : http://localhost:3001/docs
- **Frontend** : http://localhost:3000

## 🛠️ Commandes Docker utiles

```sh
# Lancer les services en mode détaché (background)
docker compose up -d

# Lancer avec rebuild des images (utile après des modifications Dockerfile)
docker compose up -d --build

# Arrêter les services
docker compose down

# Arrêter et supprimer les volumes (reset complet des données)
docker compose down -v

# Vérifier les logs d'un service spécifique
docker compose logs -f <nom_du_service>

# Vérifier les logs de tous les services
docker compose logs -f

# Voir l'état des containers
docker compose ps

# Redémarrer un service spécifique
docker compose restart <nom_du_service>

# Exécuter une commande dans un conteneur en cours d'exécution
docker compose exec <nom_du_service> <commande>

# Accéder à un shell interactif dans un conteneur
docker compose exec <nom_du_service> sh  # (ou bash si disponible)

# Mettre à l'échelle un service pour le load balancing
docker compose up -d --scale <nom_du_service>=<nombre_instances>

# Nettoyer les images non utilisées
docker system prune -af

# Lister les volumes
docker volume ls

# Supprimer tous les volumes Docker (⚠ irréversible, supprime toutes les bases de données stockées)
docker volume prune -f
```

## 🧩 Mode Développement avec Hot-Reload

Ce projet supporte le hot-reload pour tous les microservices pendant le développement. Cela signifie que vous pouvez modifier le code source de n'importe quel microservice et voir les changements instantanément, sans avoir à reconstruire les images Docker ou à redémarrer les conteneurs manuellement.

## 📊 Structure du projet

```
advanced-web-project/
├── apps/
│   ├── api-gateway/          # Point d'entrée unique pour toutes les requêtes
│   ├── auth-service/         # Gestion de l'authentification et des tokens
│   ├── frontend/             # Application web cliente
│   ├── log-service/          # Service de journalisation centralisée
│   ├── order-service/        # Gestion des commandes et du processus de livraison
│   └── user-service/         # Gestion des utilisateurs et des profils
├── packages/
│   └── prisma/               # Service partagé pour l'ORM Prisma
├── .env                      # Variables d'environnement
├── .env.example              # Exemple de configuration des variables d'environnement
├── docker-compose.yml        # Configuration Docker Compose principale
├── docker-compose.dev.yml    # Configuration pour le développement
└── package.json              # Configuration npm racine
```

## 🔄 Communication entre microservices

Les microservices communiquent entre eux principalement via :

1. **API REST** : Pour les opérations standard (API Gateway → Services)
2. **Transport TCP** : Pour les communications spécifiques entre microservices (via `@nestjs/microservices`)

## 📚 Gestion des dépendances locales

Ce projet utilise des packages locaux (comme `@advanced-web/prisma`) qui ne sont pas publiés sur le registre npm public. Notre configuration Docker gère ces dépendances de la manière suivante:

1. **Structure des dépendances locales:**
   - Les packages locaux sont stockés dans le dossier `packages/`
   - Les microservices dépendent de ces packages via leurs `package.json`

2. **Dans les Dockerfiles:**
   - Nous copions d'abord le `package.json` racine et celui du microservice
   - Nous copions ensuite le dossier `packages/` contenant les dépendances locales
   - Nous utilisons l'option `--legacy-peer-deps` pour éviter les conflits de versions
   - Nous installons les dépendances en deux étapes (racine puis service)

## 🔧 Résolution des problèmes courants

### Problème d'injection de dépendance avec PrismaService

Si vous rencontrez des erreurs comme `UnknownDependenciesException: Nest can't resolve dependencies of the UserRepository (?)`, c'est souvent lié à un problème d'injection du `PrismaService`. Solutions:

1. **Solution pour le développement**: Modification du repository pour initialiser PrismaClient directement

```typescript
// Modification dans user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  
  // Reste du repository...
}
```

### Erreur: "404 Not Found - GET https://registry.npmjs.org/@advanced-web%2fprisma"

Cette erreur se produit lorsque npm tente de télécharger un package local depuis le registre npm. Solution:

1. Vérifiez que le dossier `packages/` est bien copié dans le Dockerfile
2. Assurez-vous que `.dockerignore` n'ignore pas le dossier `packages/`
3. Reconstruisez l'image avec `.\rebuild.bat` ou `docker-compose -f docker-compose.dev.yml up --build`

### Erreur: "Could not find TypeScript configuration file "tsconfig.json"

Cette erreur se produit quand les fichiers de configuration TypeScript ne sont pas correctement montés dans le conteneur. Solution:

1. **Option 1:** Utiliser la configuration explicitant chaque fichier:
   - Dans `docker-compose.dev.yml`, assurez-vous que tous les fichiers de configuration sont montés:
   ```yaml
   volumes:
     - ./apps/service-name/src:/usr/src/app/apps/service-name/src
     - ./apps/service-name/tsconfig.json:/usr/src/app/apps/service-name/tsconfig.json
     - ./apps/service-name/tsconfig.build.json:/usr/src/app/apps/service-name/tsconfig.build.json
     - ./apps/service-name/nest-cli.json:/usr/src/app/apps/service-name/nest-cli.json
   ```

## 🆕 Modifications récentes

### API Gateway

- Correction de la configuration des routes pour la récupération d'utilisateurs par ID (`/users/:id`) et par email (`/users/by-email/:email`)
- Remplacement du décorateur `@Headers('authorization')` par un décorateur personnalisé `@AccessToken()` pour une meilleure gestion de l'authentification
- Amélioration de la documentation Swagger API

### User Service

- Suppression de `ParseIntPipe` pour permettre l'utilisation d'UUIDs dans les routes paramétrées
- Correction des méthodes de récupération d'utilisateurs par ID et par email
- Amélioration de la gestion des erreurs et des logs

### Améliorations générales

- Optimisation des mécanismes d'authentification
- Standardisation des formats de réponse API
- Documentation améliorée des endpoints

## 🧪 Tests

```bash
# Exécuter les tests unitaires
npm run test

# Exécuter les tests e2e
npm run test:e2e

# Vérifier la couverture de code
npm run test:cov
```

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).