
# Plateforme de Restauration en Ligne Distribuée
### Advanced Web Project (AWP)
## Introduction

Ce projet représente l'aboutissement de vos compétences acquises en informatique, en mettant en œuvre une plateforme logicielle distribuée pour révolutionner la restauration en ligne. L'objectif principal est de concevoir, développer, déployer, tester et utiliser une plateforme capable de rassembler et de traiter les offres commerciales du secteur de la restauration.

## Public Cible

La plateforme vise à servir plusieurs types d'utilisateurs :

*   **Utilisateurs Finaux**: Clients à la recherche de livraison de repas.
*   **Restaurateurs**: Désirant étendre leur portée et leur clientèle.
*   **Livreurs**: Indépendants gérant les livraisons.
*   **Développeurs Tiers**: Intégrant des composants logiciels de la plateforme dans leurs applications.
*   **Service Commercial**: Gérant les aspects commerciaux et le suivi des clients.
*   **Service Technique**: Assurant la qualité et la maintenance de la plateforme.

## Objectifs

*   Créer une plateforme centralisée pour la gestion des offres de restauration.
*   Fournir une expérience utilisateur personnalisée et diversifiée.
*   Développer une solution technique robuste, scalable et adaptée aux besoins de chaque type d'utilisateur.
*   Simuler les défis d'un projet d'entreprise réel, permettant l'application des compétences acquises au cours des études.

## Cahier des Charges

### Spécifications Fonctionnelles

#### Utilisateur Final

*   Gestion de compte (création, modification, suppression, consultation).
*   Gestion de commandes (création, modification, suppression, consultation, paiement).
*   Historique des commandes.
*   Suivi de livraison en temps réel.
*   Parrainage d'amis.
*   Notifications (pop-up).

#### Restaurateur

*   Gestion de compte.
*   Gestion d'articles (plats, boissons, etc.).
*   Gestion de menus.
*   Visualisation et validation des commandes.
*   Suivi de livraison.
*   Historique des commandes.
*   Statistiques.
*   Parrainage d'autres restaurateurs.
*   Notifications (pop-up).

#### Livreur

*   Gestion de compte.
*   Acceptation/refus de livraisons.
*   Prise en charge et acquittement de la livraison (avec QR code).
*   Parrainage de livreurs.
*   Notifications (pop-up).

#### Développeur Tiers

*   Gestion de compte.
*   Utilisation de l'API avec clé de sécurité.
*   Consultation des composants disponibles.
*   Téléchargement de composants.

#### Service Commercial

*   Gestion des comptes clients (consultation, suspension, modification, suppression).
*   Tableaux de bord de suivi des commandes en temps réel.
*   Notifications (pop-up).

#### Service Technique

*   Ajout/suppression de composants réutilisables.
*   Consultation des logs de connexion.
*   Statistiques de performance des serveurs et microservices.
*   Logs de téléchargement des composants.
*   Orchestration des routes pour les demandes entrantes.
*   Déploiement de nouveaux services sans interruption.
*   Notifications (pop-up).

### Spécifications d'Architecture

#### Applications (Livreur, Restaurateur, Client Final, Commercial/Technique)

*   Couche présentation pour l'interface utilisateur.
*   Couche de composants locaux pour les traitements locaux et l'invocation des services distants.
*   Couche de communication assurant la sécurité et le respect du protocole de la plateforme.
*   Applications Commercial/Technique : architecture basée sur des composants graphiques réutilisables et dynamiques.

#### Plateforme (Middleware)

*   Architecture hybride (SOA, ESB, Microservices).
*   Liaison de données sécurisée et asynchrone (orientée message).
*   Scalabilité pour gérer les montées en charge.
*   Conteneurisation des modules à forte consommation de ressources.
*   Point de terminaison sécurisé, interopérable et asynchrone.
*   Couche services exposant les services de la plateforme.
*   Contrôleur de résolution vérifiant les autorisations via token.
*   Proxy pour la récupération des statistiques de performance et le routage des messages.
*   Microservice/Méta-service gérant les opérations transactionnelles.
*   Composants spécialisés agrégés par les microservices.

#### Données

*   Persistance des informations non relationnelles (NoSQL).
*   Entrepôt pour les sources documentaires.
*   Stockage des composants réutilisables.

### Architecture Globale

*   Équilibre entre une architecture orientée service et une architecture orientée microservices.

#### Partie Applicative

*   Front : fonctionnalités de l'application et validation des saisies utilisateur.
*   Middleware local : traitement local des messages et services spécifiques à l'application.
*   Proxy : communication avec la plateforme.

#### Partie Plateforme

*   Couche services : endpoint unique, documentation développeur.
*   Contrôleur de résolution : vérification du type d'application, version, demande, droits utilisateur.
*   Proxy : communication et load-balancing.
*   Couche composants (virtualisée) : contrôleur d'exécution transactionnel, plugins, proxy.
*   Couche data : SGBD (R/NoSQL).

### Autres Spécifications

*   Suivi de livraison : utilisation d'un composant MAP et possibilité de sockets en temps réel.
*   Stockage des données applicatives : base NoSQL (MongoDB).
*   Documentation des APIs : permettant à n'importe quel développeur de consommer les APIs.
*   Messages de retour normalisés.
*   Application développeur tiers : lien avec un service NPM (composants réutilisables).
<<<<<<< HEAD
test du H
=======
>>>>>>> 80c65ce0cf4ce69b5e0603c8839ba3caace1b5d2
