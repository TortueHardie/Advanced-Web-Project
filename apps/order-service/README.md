# Order Service

Ce microservice fait partie de l'application de livraison Pop-Eat et gère tout ce qui concerne les commandes.

## Fonctionnalités

- Création de commandes
- Suivi des commandes
- Modification des statuts (pending, accepted, in_progress, ready, delivered, canceled)
- Annulation de commandes
- Consultation des commandes pour utilisateurs et administrateurs/restaurants

## Architecture

Ce service s'exécute sous deux formes :
- Un microservice TCP sur le port 4002 pour la communication inter-services
- Une API HTTP sur le port 3002 avec documentation Swagger

## Exécution

Pour lancer le service en mode développement :

```bash
npm run start:dev order-service
```

Pour lancer le service en mode production :

```bash
npm run build order-service
npm run start:prod order-service
```

## Documentation API (Swagger)

La documentation de l'API est disponible via Swagger UI à l'adresse :

```
http://localhost:3002/docs
```

### Authentification

Toutes les routes de l'API nécessitent une authentification par JWT token. Dans l'interface Swagger, cliquez sur le bouton "Authorize" et entrez votre token au format :

```
Bearer votre-token-jwt
```

#### Tokens de développement

Pour faciliter les tests en développement, vous pouvez générer des tokens JWT de test avec la commande :

```bash
npm run generate:tokens
```

Cette commande affichera trois types de tokens :
- Token Utilisateur - Pour tester les routes utilisateur standard
- Token Restaurant - Pour tester les routes nécessitant un accès restaurant
- Token Admin - Pour tester les routes administrateur

Ces tokens sont également affichés automatiquement lors du démarrage du service en mode développement.

**Note**: Ces tokens sont uniquement pour le développement et les tests. En production, utilisez un vrai système d'authentification.

### Structure des APIs

La documentation Swagger présente deux catégories d'endpoints :

1. **Orders** : APIs REST destinées aux clients de l'application
2. **Microservice** : APIs internes pour la communication entre microservices (TCP)

## Modèles de données

### Création d'une commande

```typescript
{
  restaurantId: number;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  deliveryAddress: string;
  paymentMethod: string; // 'card', 'cash', 'paypal'
}
```

### Statuts de commande

```typescript
enum OrderStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}
```

## Communication avec d'autres services

Ce service communique avec les services suivants :
- **Auth Service** : Validation des tokens JWT
- **Restaurant Service** : Vérification des informations restaurant et produits
- **User Service** : Récupération des informations utilisateur

## Développement

Pour générer ou modifier la documentation Swagger, voir le fichier `src/swagger.config.ts`.

### Export OpenAPI

Pour exporter la spécification OpenAPI au format JSON (utile pour les outils de génération de client ou de documentation externe) :

```bash
npm run export:openapi
```

Cela générera un fichier `openapi-spec.json` à la racine du projet qui peut être importé dans d'autres outils comme Postman, Stoplight, ou Redoc. 