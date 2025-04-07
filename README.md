# Commandes Docker Compose pour le développement

Ce projet utilise Docker Compose pour orchestrer plusieurs applications backend et frontend dans un monorepo. Vous pouvez instancier plusieurs services pour assurer le load balancing et la scalabilité.

## �� Commandes utiles

API GATEWAY
swagger Api Gateway : http://localhost:3000/docs

USER-SEVICE
swagger service Utilisateurs accès via proxy : http://localhost:3000/api-docs/user
swagger service Utilisateurs accès direct : http://localhost:3001/docs

## Routes API

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

## Authentification et Autorisation

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

## Lancer en dev : 
```sh
npm run start 
```

## Lancer en mode prod :
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
## 🏗️ Image Docker  
Une image Docker est un modèle immuable utilisé pour créer des conteneurs. Elle contient tout le nécessaire pour exécuter une application : code, dépendances, runtime et configuration.  

- Une image est construite à partir d'un **Dockerfile**.
- Elle peut être stockée et partagée via **Docker Hub** ou un registre privé.  
```sh
### Commandes utiles :
docker pull nginx        # Télécharger une image depuis Docker Hub
docker images            # Lister les images locales
docker rmi <image_id>    # Supprimer une image
```
📦 Volume Docker
Un volume Docker est un espace de stockage persistant utilisé par les conteneurs. Contrairement aux fichiers stockés dans un conteneur, un volume n'est pas supprimé quand le conteneur est arrêté ou supprimé.

Il permet de partager des données entre conteneurs et de préserver les données même après l'arrêt des services.
```sh
###Commandes utiles :
docker volume create my_volume    # Créer un volume
docker volume ls                  # Lister les volumes existants
docker volume rm my_volume        # Supprimer un volume
```

🌐 Réseau Docker
Un réseau Docker permet aux conteneurs de communiquer entre eux et avec l'extérieur.

Types de réseaux :
bridge (par défaut) : réseau privé entre les conteneurs.
host : partage le réseau de l'hôte (pas d'isolation).
none : pas de réseau (conteneur totalement isolé).
overlay : pour connecter plusieurs hôtes Docker.

```sh
###Commandes utiles :
docker network create my_network         # Créer un réseau
docker network ls                        # Lister les réseaux
docker network inspect my_network        # Voir les détails d'un réseau
docker network rm my_network             # Supprimer un réseau
```

📌 Lancer plusieurs instances d'un service (load balancing)
Docker Compose permet d'exécuter plusieurs instances d'un même service avec --scale, ce qui est utile pour la répartition de charge :

Exemple :
```sh
docker compose up -d --scale backend=3 --scale frontend=2
```
Cela lance 3 instances du backend et 2 instances du frontend.

Modifier le nombre d'instances à la volée :

```sh
docker compose up -d --scale backend=5
```

Ici, on passe à 5 instances du backend.

⚠️ Attention : Assurez-vous que vos services utilisent un reverse proxy (ex: Nginx, Traefik) et que votre base de données gère bien les connexions simultanées.

## Mode Développement avec Hot-Reload

Ce projet supporte le hot-reload pour tous les microservices pendant le développement. Cela signifie que vous pouvez modifier le code source de n'importe quel microservice et voir les changements instantanément, sans avoir à reconstruire les images Docker ou à redémarrer les conteneurs manuellement.

### Prérequis

- Docker et Docker Compose installés
- Pour les utilisateurs Windows: WSL2 recommandé pour de meilleures performances

### Démarrage du mode développement

Pour démarrer l'environnement de développement avec hot-reload:

```bash
# Sur Linux/macOS
./dev.sh

# Sur Windows
.\dev.bat
```

Ou utilisez directement Docker Compose:

```bash
docker-compose -f docker-compose.dev.yml up --build
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

### Gestion des dépendances locales

Ce projet utilise des packages locaux (comme `@advanced-web/prisma`) qui ne sont pas publiés sur le registre npm public. Notre configuration Docker gère ces dépendances de la manière suivante:

1. **Structure des dépendances locales:**
   - Les packages locaux sont stockés dans le dossier `packages/`
   - Les microservices dépendent de ces packages via leurs `package.json`

2. **Dans les Dockerfiles:**
   - Nous copions d'abord le `package.json` racine et celui du microservice
   - Nous copions ensuite le dossier `packages/` contenant les dépendances locales
   - Nous utilisons l'option `--legacy-peer-deps` pour éviter les conflits de versions
   - Nous installons les dépendances en deux étapes (racine puis service)

3. **Configuration des volumes:**
   - Les fichiers source sont montés comme volumes pour le hot-reload
   - Le dossier `packages/` est également monté pour permettre les modifications en direct

## Architecture et solutions aux problèmes communs

### Structure de l'application

1. **API Gateway**: Point d'entrée unique pour toutes les requêtes externes
   - Gère le CORS et route les requêtes vers les microservices appropriés
   - Fournit une documentation API unifiée via Swagger

2. **Microservices**: Chaque service est isolé et se concentre sur une fonctionnalité spécifique
   - Chaque service a son propre Dockerfile et peut être déployé indépendamment
   - Communication interne via le réseau Docker (`app-network`)

3. **Base de données partagée**: Dans cette configuration, tous les services utilisent la même base PostgreSQL
   - Chaque service utilise son propre client Prisma, mais pointe vers la même BDD
   - La migration vers des bases distinctes par service est possible pour plus d'isolation

### Résolution des problèmes courants

#### Problème d'injection de dépendance avec PrismaService

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

Et mise à jour du module:

```typescript
// app.module.ts
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository], // PrismaService retiré
})
export class AppModule {}
```

2. **Solution alternative**: Utilisation de liens symboliques dans le Dockerfile.dev

```dockerfile
# Création des répertoires nécessaires
RUN mkdir -p /usr/src/app/apps/user-service/src/prisma

# Création de liens symboliques pour le PrismaService
RUN ln -sf /usr/src/app/packages/prisma/src/prisma.service.ts /usr/src/app/apps/user-service/src/prisma/prisma.service.ts
RUN ln -sf /usr/src/app/packages/prisma/src/index.ts /usr/src/app/apps/user-service/src/prisma/index.ts
```

#### Erreur: "404 Not Found - GET https://registry.npmjs.org/@advanced-web%2fprisma"

Cette erreur se produit lorsque npm tente de télécharger un package local depuis le registre npm. Solution:

1. Vérifiez que le dossier `packages/` est bien copié dans le Dockerfile
2. Assurez-vous que `.dockerignore` n'ignore pas le dossier `packages/`
3. Reconstruisez l'image avec `.\rebuild.bat` ou `docker-compose -f docker-compose.dev.yml up --build`

#### Erreur: "Could not find TypeScript configuration file "tsconfig.json"

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

2. **Option 2:** Utiliser la configuration simplifiée:
   - Exécutez `.\rebuild.bat` et choisissez "O" pour utiliser la configuration simplifiée qui monte les dossiers complets
   ```yaml
   volumes:
     - ./apps/service-name:/usr/src/app/apps/service-name
     - /usr/src/app/apps/service-name/node_modules # Anonymous volume pour ne pas écraser node_modules
   ```