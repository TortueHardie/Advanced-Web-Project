import { Request, Response, NextFunction } from 'express';
import { JWTService } from './jwt.service';

/**
 * Type pour les requêtes authentifiées qui incluent des informations utilisateur
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role?: string;
  };
}

/**
 * Options pour le middleware d'authentification
 */
export interface AuthOptions {
  /** Si vrai, renvoie une erreur 401 lorsque l'authentification échoue */
  failWithError?: boolean;
  /** Rôles requis pour accéder à la ressource */
  roles?: string[];
}

/**
 * Middleware d'authentification pour Express
 * @param options Options de configuration
 */
export function authenticate(options: AuthOptions = {}) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        if (options.failWithError) {
          return res.status(401).json({ message: 'Token manquant ou format invalide' });
        }
        return next();
      }
      
      const token = authHeader.substring(7); // Retirer "Bearer " du header
      const result = await JWTService.verifyToken(token);
      
      if (!result.isValid || !result.user) {
        if (options.failWithError) {
          return res.status(401).json({ message: result.error || 'Token invalide' });
        }
        return next();
      }
      
      // Vérifier le rôle si nécessaire
      if (options.roles && options.roles.length > 0) {
        const hasRole = options.roles.includes(result.user.role || '');
        if (!hasRole) {
          return res.status(403).json({ message: 'Accès non autorisé - rôle insuffisant' });
        }
      }
      
      // Attacher les informations utilisateur à la requête
      req.user = {
        userId: result.user.userId,
        role: result.user.role
      };
      
      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Middleware qui requiert l'authentification (renvoie toujours une erreur si non authentifié)
 */
export function requireAuth(roles?: string[]) {
  return authenticate({ failWithError: true, roles });
}

/**
 * Middleware qui vérifie si l'utilisateur a un rôle administrateur
 */
export function requireAdmin() {
  return requireAuth(['admin']);
}

/**
 * Middleware qui vérifie si l'utilisateur a un rôle restaurant
 */
export function requireRestaurant() {
  return requireAuth(['restaurant']);
}

/**
 * Middleware qui vérifie si l'utilisateur est admin ou restaurant
 */
export function requireRestaurantOrAdmin() {
  return requireAuth(['admin', 'restaurant']);
} 