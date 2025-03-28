# Service d'Authentification

Ce service gère l'authentification JWT pour l'application. Il fournit des endpoints pour l'inscription, la connexion, la vérification, le rafraîchissement et la révocation des tokens JWT.

## Fonctionnalités

- Inscription des utilisateurs
- Connexion des utilisateurs
- Vérification des tokens JWT
- Rafraîchissement des tokens
- Révocation des tokens
- Stockage des tokens blacklistés dans Redis
- Logging des opérations

## Endpoints

### POST /auth/register
Inscription d'un nouvel utilisateur.

**Body:**
```json
{
  "email": "utilisateur@exemple.com",
  "password": "mot_de_passe_sécurisé",
  "name": "Nom Utilisateur"
}
```

**Réponse:**
```json
{
  "message": "Inscription réussie",
  "accessToken": "<access_token>",
  "refreshToken": "<refresh_token>",
  "userId": "<user_id>"
}
```

### POST /auth/login
Connexion d'un utilisateur existant.

**Body:**
```json
{
  "email": "utilisateur@exemple.com",
  "password": "mot_de_passe_sécurisé"
}
```

**Réponse:**
```json
{
  "message": "Connexion réussie",
  "accessToken": "<access_token>",
  "refreshToken": "<refresh_token>",
  "userId": "<user_id>"
}
```

### POST /auth/verify
Vérifie la validité d'un token JWT.

**Headers requis:**
```
Authorization: Bearer <token>
```

**Réponse:**
```json
{
  "valid": true
}
```

### POST /auth/refresh
Rafraîchit un token JWT en utilisant un refresh token.

**Body:**
```json
{
  "refreshToken": "<refresh_token>"
}
```

**Réponse:**
```json
{
  "accessToken": "<nouveau_access_token>",
  "refreshToken": "<nouveau_refresh_token>"
}
```

### POST /auth/revoke
Révoque un token JWT.

**Headers requis:**
```
Authorization: Bearer <token>
```

**Réponse:**
```json
{
  "message": "Token révoqué avec succès"
}
```

## Configuration

Les variables d'environnement suivantes sont requises :

- `JWT_SECRET`: Secret pour la signature des tokens d'accès
- `JWT_REFRESH_SECRET`: Secret pour la signature des refresh tokens
- `REDIS_HOST`: Hôte Redis (par défaut: localhost)
- `REDIS_PORT`: Port Redis (par défaut: 6379)
- `USER_SERVICE_URL`: URL du service utilisateur (par défaut: http://user-service:3001)

## Installation

```bash
npm install
```

## Démarrage

En développement :
```bash
npm run dev
```

En production :
```bash
npm run build
npm start
```

## Tests

```bash
npm test
```

## Sécurité

- Les tokens d'accès expirent après 15 minutes
- Les refresh tokens expirent après 7 jours
- Les tokens révoqués sont stockés dans Redis
- Rate limiting appliqué sur tous les endpoints
- Headers de sécurité (Helmet) activés
- CORS configuré 