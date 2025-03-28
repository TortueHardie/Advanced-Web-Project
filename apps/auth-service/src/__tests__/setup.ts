import dotenv from 'dotenv';

// Charger les variables d'environnement de test
dotenv.config({ path: '.env.test' });

// Configuration globale pour les tests
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.REDIS_HOST = 'localhost';
process.env.REDIS_PORT = '6379';

// Augmenter le timeout pour les tests
jest.setTimeout(10000); 