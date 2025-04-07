import { Router, Request, Response } from 'express';
import { JWTService } from '../services/jwt.service';
import { logger } from '../utils/logger';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { randomInt, randomUUID } from 'crypto';

const router = Router();
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3001';

// Types pour les réponses API
interface ValidateUserResponse {
  valid: boolean;
  userId: string;
}

interface UserResponse {
  id: string;
  email: string;
  name: string;
}

// Middleware pour extraire le token du header
const extractToken = (req: any, res: Response, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }
  req.token = token;
  next();
};

// Vérification du token
router.post('/verify', extractToken, async (req: any, res: Response) => {
  try {
    const isValid = await JWTService.verifyToken(req.token);
    if (!isValid) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
    res.json({ valid: true });
  } catch (error) {
    logger.error('Erreur lors de la vérification du token:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Rafraîchissement du token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token manquant' });
    }

    const isValid = await JWTService.verifyRefreshToken(refreshToken);
    if (!isValid) {
      return res.status(401).json({ message: 'Refresh token invalide' });
    }

    const tokens = await JWTService.refreshTokens(refreshToken);
    if (!tokens) {
      return res.status(401).json({ message: 'Impossible de rafraîchir les tokens' });
    }

    res.json(tokens);
  } catch (error) {
    logger.error('Erreur lors du rafraîchissement des tokens:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Révocation du token
router.post('/revoke', extractToken, async (req: any, res: Response) => {
  try {
    await JWTService.revokeToken(req.token);
    res.json({ message: 'Token révoqué avec succès' });
  } catch (error) {
    logger.error('Erreur lors de la révocation du token:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Connexion
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }
    
    // Appel au service utilisateur pour vérifier les identifiants
    const response = await axios.post<ValidateUserResponse>(`${USER_SERVICE_URL}/users/validate`, { 
      email, 
      password 
    });
    
    if (!response.data.valid) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    
    const userId = response.data.userId;
    const tokens = JWTService.generateTokens(userId);
    
    res.json({ 
      message: 'Connexion réussie',
      ...tokens,
      userId
    });
  } catch (error) {
    logger.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Inscription
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, mot de passe et nom requis' });
    }
    
    // Vérifier si l'utilisateur existe déjà
    try {
      await axios.get(`${USER_SERVICE_URL}/users/by-email/${email}`);
      return res.status(409).json({ message: 'Un utilisateur avec cet email existe déjà' });
    } catch (error: any) {
      // Si l'erreur est 404, c'est que l'utilisateur n'existe pas, on peut continuer
      if (error.response?.status !== 404) {
        throw error;
      }
    }
    
    // Créer l'utilisateur dans le service utilisateur
    const response = await axios.post<UserResponse>(`${USER_SERVICE_URL}/users`, {
      email,
      password,
      name
    });
    
    const userId = response.data.id;
    const tokens = JWTService.generateTokens(userId);
    
    res.status(201).json({
      message: 'Inscription réussie',
      ...tokens,
      userId
    });
  } catch (error) {
    logger.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export const authRouter = router; 