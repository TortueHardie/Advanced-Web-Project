import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuration de Swagger
setupSwagger(app);

// Utiliser les routes
app.use('/', routes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Logging service listening on port ${PORT}`);
}); 