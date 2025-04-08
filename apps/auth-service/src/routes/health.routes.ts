import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger';
import axios from 'axios';

const router = Router();
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3001';

// Route simple pour vérifier que le service est en cours d'exécution
router.get('/', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

// Route pour vérifier la connectivité avec le service utilisateur
router.get('/check-user-service', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users`);
    res.json({ 
      status: 'ok', 
      userService: {
        status: 'connected',
        url: USER_SERVICE_URL,
        statusCode: response.status
      }
    });
  } catch (error) {
    logger.error('Erreur de connectivité avec le service utilisateur:', error);
    res.status(500).json({ 
      status: 'error', 
      userService: {
        status: 'disconnected',
        url: USER_SERVICE_URL,
        error: error.message
      }
    });
  }
});

export const healthRouter = router; 