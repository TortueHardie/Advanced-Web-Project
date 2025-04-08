import * as jwt from 'jsonwebtoken';
import { Redis } from 'ioredis';
import { JWTPayload, TokenPair, VerifyTokenResult } from './types';

/**
 * Service centralisé pour la gestion des JWT dans l'application
 */
export class JWTService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt';
  private static readonly JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'votre-secret-refresh';
  private static readonly ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '15m';
  private static readonly REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '1d';
  
  private static redis: Redis;

  /**
   * Initialise la connexion Redis pour la gestion des tokens blacklistés
   */
  static initRedis(options?: Record<string, any>): void {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      ...options
    });
  }

  /**
   * Génère un pair de tokens (accès et rafraîchissement) pour un utilisateur
   */
  static generateTokens(userId: string, role?: string): TokenPair {
    const payload: JWTPayload = { userId };
    if (role) {
      payload.role = role;
    }

    const accessToken = jwt.sign(
      payload,
      this.JWT_SECRET as jwt.Secret,
      { expiresIn: this.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      payload,
      this.JWT_REFRESH_SECRET as jwt.Secret,
      { expiresIn: this.REFRESH_TOKEN_EXPIRY }
    );

    return { accessToken, refreshToken };
  }

  /**
   * Vérifie si un token d'accès est valide
   */
  static async verifyToken(token: string): Promise<VerifyTokenResult> {
    try {
      // S'assurer que Redis est initialisé
      if (!this.redis) {
        this.initRedis();
      }

      // Vérifier si le token est blacklisté
      const isBlacklisted = await this.redis.get(`blacklist:${token}`);
      if (isBlacklisted) {
        return { isValid: false, error: 'Token révoqué' };
      }

      const decoded = jwt.verify(token, this.JWT_SECRET) as JWTPayload;
      return { isValid: true, user: decoded };
    } catch (error) {
      const err = error as Error;
      return { isValid: false, error: err.message };
    }
  }

  /**
   * Vérifie si un token de rafraîchissement est valide
   */
  static async verifyRefreshToken(token: string): Promise<VerifyTokenResult> {
    try {
      const decoded = jwt.verify(token, this.JWT_REFRESH_SECRET) as JWTPayload;
      return { isValid: true, user: decoded };
    } catch (error) {
      const err = error as Error;
      return { isValid: false, error: err.message };
    }
  }

  /**
   * Révoque un token en l'ajoutant à la liste noire
   */
  static async revokeToken(token: string): Promise<void> {
    try {
      // S'assurer que Redis est initialisé
      if (!this.redis) {
        this.initRedis();
      }

      const decoded = jwt.decode(token) as { exp: number };
      if (!decoded || !decoded.exp) {
        throw new Error('Token invalide');
      }
      
      const ttl = decoded.exp - Math.floor(Date.now() / 1000);
      
      if (ttl > 0) {
        await this.redis.set(`blacklist:${token}`, '1', 'EX', ttl);
      }
    } catch (error) {
      console.error('Erreur lors de la révocation du token:', error);
      throw error;
    }
  }

  /**
   * Rafraîchit un pair de tokens en utilisant un token de rafraîchissement
   */
  static async refreshTokens(refreshToken: string): Promise<TokenPair | null> {
    const result = await this.verifyRefreshToken(refreshToken);
    if (!result.isValid || !result.user) {
      return null;
    }
    
    return this.generateTokens(result.user.userId, result.user.role);
  }

  /**
   * Extrait les informations utilisateur d'un token
   */
  static extractUserFromToken(token: string): JWTPayload | null {
    try {
      if (!token) return null;
      
      // Supprimer le préfixe "Bearer " si présent
      const actualToken = token.startsWith('Bearer ') 
        ? token.substring(7) 
        : token;
        
      const decoded = jwt.decode(actualToken) as JWTPayload;
      return decoded;
    } catch (error) {
      console.error('Erreur lors de l\'extraction des informations utilisateur:', error);
      return null;
    }
  }

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   */
  static hasRole(token: string, role: string): boolean {
    const user = this.extractUserFromToken(token);
    return user?.role === role;
  }
} 