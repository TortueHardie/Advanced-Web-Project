import jwt from 'jsonwebtoken';
import { Redis } from 'ioredis';
import { logger } from '../utils/logger';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

export class JWTService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt';
  private static readonly JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'votre-secret-refresh';
  private static readonly ACCESS_TOKEN_EXPIRY = '15m';
  private static readonly REFRESH_TOKEN_EXPIRY = '1d';

  static generateTokens(userId: string): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(
      { userId },
      this.JWT_SECRET,
      { expiresIn: this.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { userId },
      this.JWT_REFRESH_SECRET,
      { expiresIn: this.REFRESH_TOKEN_EXPIRY }
    );

    return { accessToken, refreshToken };
  }

  static async verifyToken(token: string): Promise<boolean> {
    try {
      // Vérifier si le token est blacklisté
      const isBlacklisted = await redis.get(`blacklist:${token}`);
      if (isBlacklisted) {
        return false;
      }

      jwt.verify(token, this.JWT_SECRET);
      return true;
    } catch (error) {
      logger.error('Erreur de vérification du token:', error);
      return false;
    }
  }

  static async verifyRefreshToken(token: string): Promise<boolean> {
    try {
      jwt.verify(token, this.JWT_REFRESH_SECRET);
      return true;
    } catch (error) {
      logger.error('Erreur de vérification du refresh token:', error);
      return false;
    }
  }

  static async revokeToken(token: string): Promise<void> {
    try {
      const decoded = jwt.decode(token) as { exp: number };
      const ttl = decoded.exp - Math.floor(Date.now() / 1000);
      
      if (ttl > 0) {
        await redis.set(`blacklist:${token}`, '1', 'EX', ttl);
      }
    } catch (error) {
      logger.error('Erreur lors de la révocation du token:', error);
    }
  }

  static async refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | null> {
    try {
      const decoded = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET) as { userId: string };
      return this.generateTokens(decoded.userId);
    } catch (error) {
      logger.error('Erreur lors du rafraîchissement des tokens:', error);
      return null;
    }
  }
} 