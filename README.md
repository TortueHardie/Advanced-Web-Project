# Advanced Web Project

## 🏗 Architecture du Projet

Ce projet est une application web moderne basée sur une architecture microservices. Il utilise un monorepo géré par Turborepo et est conteneurisé avec Docker.

### Structure du Projet

```
.
├── apps/                    # Applications principales
│   ├── api-gateway/        # Point d'entrée API
│   ├── auth-service/       # Service d'authentification
│   ├── user-service/       # Gestion des utilisateurs
│   ├── product-service/    # Gestion des produits
│   ├── location-service/   # Service de géolocalisation
│   ├── log-service/        # Service de logging
│   ├── order-service/      # Gestion des commandes
│   └── frontend/           # Interface utilisateur
│
├── packages/               # Packages partagés
│   ├── prisma/            # Configuration Prisma
│   ├── discovery/         # Service discovery
│   ├── auth/              # Logique d'authentification
│   └── common/            # Utilitaires communs
│
└── docker/                # Configuration Docker
```

### Technologies Principales

- **Frontend**: Angular, Angular Material
- **Backend**: NestJS (microservices)
- **Base de données**: PostgreSQL, MongoDB, Redis
- **Conteneurisation**: Docker & Docker Compose
- **Gestion de Monorepo**: Turborepo
- **ORM**: Prisma

## 🚀 Installation et Démarrage

### Prérequis

- Node.js (v18 ou supérieur)
- npm (v10.9.2 ou supérieur)
- Docker et Docker Compose
- Git

### Configuration

1. Cloner le repository :
```bash
git clone https://github.com/TortueHardie/Advanced-Web-Project.git
cd Advanced-Web-Project
```

2. Copier le fichier d'environnement :
```bash
cp .env.example .env
```

3. Configurer les variables d'environnement dans le fichier `.env` :
```env
DATABASE_USER_POSTGRES=votre_utilisateur
DATABASE_MDP_POSTGRES=votre_mot_de_passe
DATABASE_NAME_POSTGRES=votre_base
DATABASE_URL_POSTGRES=postgresql://votre_utilisateur:votre_mot_de_passe@postgres-db:5432/votre_base
JWT_SECRET=votre_secret_jwt
JWT_REFRESH_SECRET=votre_secret_refresh
REDIS_PASSWORD=votre_mot_de_passe_redis
```

### Installation des Dépendances

```bash
npm run install:deps
```

### Démarrage du front

```bash
npm run start
```

### Démarrage du backend
```bash
docker-compose up -d
```

## 🌐 Accès aux Services

Une fois démarré, les services sont accessibles aux adresses suivantes :

- **API Gateway** (Swagger): http://localhost:3000
- **Auth Service**: http://localhost:3001
- **User Service**: http://localhost:3001
- **Product Service**: http://localhost:3002
- **Location Service**: http://localhost:3003
- **Log Service**: http://localhost:3004
- **Frontend**: http://localhost:4200
- **Prisma**: http://localhost:5555

## 🔧 Scripts Disponibles

- `npm run build`: Construction de tous les services
- `npm run build:api-gateway`: Construction du service API Gateway
- `npm run build:user-service`: Construction du service utilisateur
- `npm run install:deps`: Installation des dépendances pour tous les services

## 📦 Structure des Services

### API Gateway
- Point d'entrée unique pour toutes les requêtes API
- Gestion du routage et de l'authentification
- Rate limiting et sécurité

### Auth Service
- Gestion de l'authentification
- Génération et validation des JWT
- Gestion des sessions

### User Service
- Gestion des utilisateurs
- Profils et préférences
- Authentification

### Product Service
- Gestion du catalogue produits
- Catégorisation et recherche
- Gestion des stocks

### Location Service
- Services de géolocalisation
- Gestion des adresses
- Calcul de distances

### Log Service
- Centralisation des logs
- Monitoring et alerting
- Analyse des performances

## 🔍 Monitoring et Maintenance

### Logs
Les logs sont disponibles dans les volumes Docker suivants :
- `api_gateway_logs`
- `log_service_data`

### Health Checks
Chaque service dispose d'un endpoint de santé accessible à `/health`

## 🛠 Développement

### Ajout d'un Nouveau Service

1. Créer un nouveau dossier dans `apps/`
2. Configurer le Dockerfile
3. Ajouter le service dans `docker-compose.yml`
4. Mettre à jour les variables d'environnement

### Modification d'un Service Existant

1. Arrêter le service concerné
2. Effectuer les modifications
3. Reconstruire le service
4. Redémarrer le service

## 📚 Documentation

Pour plus d'informations sur chaque service, consulter la documentation dans les dossiers respectifs :
- `/apps/[service-name]/README.md`

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request
