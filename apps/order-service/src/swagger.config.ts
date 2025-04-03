import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Order Service API')
  .setDescription(
    'Documentation de l\'API Order Service pour la gestion des commandes dans l\'application de livraison Pop-Eat. ' +
    'Ce service gère la création des commandes, le suivi, la modification des statuts et l\'annulation.' +
    '\n\n' +
    'Ce service expose des endpoints REST et fournit également des méthodes pour la communication entre microservices via TCP.' +
    '\n\n' +
    '## Authentification\n' +
    'Pour utiliser les endpoints sécurisés, veuillez cliquer sur le bouton "Authorize" en haut à droite et entrer votre token JWT avec le préfixe "Bearer ".\n' +
    'Exemple: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`\n' +
    'Une fois authentifié, tous les endpoints utiliseront automatiquement votre token sans besoin de le renseigner à chaque requête.'
  )
  .setVersion('1.0')
  .setContact('Pop-Eat Dev Team', 'https://www.pop-eat.fr', 'dev@pop-eat.fr')
  .setLicense('MIT', 'https://opensource.org/licenses/MIT')
  .setExternalDoc('Microservices Documentation', 'https://pop-eat-docs.com')
  .addServer('http://localhost:3002', 'Local Development')
  .addServer('https://api.pop-eat.fr/orders', 'Production Environment')
  .addTag('Orders', 'Endpoints pour la gestion des commandes')
  .addTag('Microservice', 'Endpoints de communication entre microservices')
  .addBearerAuth(
    { 
      type: 'http', 
      scheme: 'bearer', 
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header'
    },
    'Authorization'
  )
  .build();

export const swaggerDocumentOptions = {
  operationIdFactory: (
    controllerKey: string,
    methodKey: string
  ) => methodKey,
  deepScanRoutes: true
};

export const swaggerSetupOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 1,
    tryItOutEnabled: true,
  },
  customSiteTitle: 'Pop-Eat Order API',
  customfavIcon: 'https://pop-eat.fr/favicon.ico',
  customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui.css',
}; 