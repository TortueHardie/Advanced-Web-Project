# Commandes Docker Compose pour le développement

Ce projet utilise Docker Compose pour orchestrer plusieurs applications backend et frontend dans un monorepo. Vous pouvez instancier plusieurs services pour assurer le load balancing et la scalabilité.

## 📌 Commandes utiles



API GATEWAY
swagger Api Gateway : http://localhost:3000/docs

USER-SEVICE
swagger service Utilisateurs accès via proxy : http://localhost:3000/api-docs/user
swagger service Utilisateurs accès direct : http://localhost:3001/docs

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

# Mettre à l’échelle un service pour le load balancing
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
Un volume Docker est un espace de stockage persistant utilisé par les conteneurs. Contrairement aux fichiers stockés dans un conteneur, un volume n’est pas supprimé quand le conteneur est arrêté ou supprimé.

Il permet de partager des données entre conteneurs et de préserver les données même après l’arrêt des services.
```sh
###Commandes utiles :
docker volume create my_volume    # Créer un volume
docker volume ls                  # Lister les volumes existants
docker volume rm my_volume        # Supprimer un volume
```

🌐 Réseau Docker
Un réseau Docker permet aux conteneurs de communiquer entre eux et avec l’extérieur.

Types de réseaux :
bridge (par défaut) : réseau privé entre les conteneurs.
host : partage le réseau de l’hôte (pas d’isolation).
none : pas de réseau (conteneur totalement isolé).
overlay : pour connecter plusieurs hôtes Docker.

```sh
###Commandes utiles :
docker network create my_network         # Créer un réseau
docker network ls                        # Lister les réseaux
docker network inspect my_network        # Voir les détails d’un réseau
docker network rm my_network             # Supprimer un réseau
```

📌 Lancer plusieurs instances d’un service (load balancing)
Docker Compose permet d’exécuter plusieurs instances d’un même service avec --scale, ce qui est utile pour la répartition de charge :

Exemple :
```sh
docker compose up -d --scale backend=3 --scale frontend=2
```
Cela lance 3 instances du backend et 2 instances du frontend.

Modifier le nombre d’instances à la volée :

```sh
docker compose up -d --scale backend=5
```

Ici, on passe à 5 instances du backend.

⚠️ Attention : Assurez-vous que vos services utilisent un reverse proxy (ex: Nginx, Traefik) et que votre base de données gère bien les connexions simultanées.