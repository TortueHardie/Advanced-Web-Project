import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const setupSwagger = (app: Express) => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Service de Logs',
        version: '1.0.0',
        description: 'API pour gérer les logs de l\'application',
      },
      servers: [
        {
          url: 'http://localhost:3004',
          description: 'Serveur de développement',
        },
      ],
    },
    apis: ['./src/routes.ts', './src/controllers/*.ts'],
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  console.log('Documentation Swagger disponible à l\'adresse: http://localhost:3004/docs');
}; 