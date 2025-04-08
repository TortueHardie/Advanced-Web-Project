import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.routes';
import { healthRouter } from './routes/health.routes';
import { errorHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de sécurité
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limite chaque IP à 100 requêtes par fenêtre
// });
// app.use(limiter);

// Endpoint de santé
app.get('/auth/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/auth', authRouter);
app.use('/health', healthRouter);

// Middleware de gestion des erreurs
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Service d'authentification démarré sur le port ${PORT}`);
  logger.info(`Variables d'environnement: REDIS_HOST=${process.env.REDIS_HOST}, USER_SERVICE_URL=${process.env.USER_SERVICE_URL}`);
}); 