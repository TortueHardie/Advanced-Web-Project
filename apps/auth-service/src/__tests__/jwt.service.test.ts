import { JWTService } from '../services/jwt.service';
import jwt from 'jsonwebtoken';

describe('JWTService', () => {
  const userId = 'test-user-id';

  describe('generateTokens', () => {
    it('should generate valid access and refresh tokens', () => {
      const tokens = JWTService.generateTokens(userId);

      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');

      // Vérifier que les tokens sont valides
      const decodedAccess = jwt.verify(tokens.accessToken, process.env.JWT_SECRET!);
      const decodedRefresh = jwt.verify(tokens.refreshToken, process.env.JWT_REFRESH_SECRET!);

      expect(decodedAccess).toHaveProperty('userId', userId);
      expect(decodedRefresh).toHaveProperty('userId', userId);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', async () => {
      const tokens = JWTService.generateTokens(userId);
      const isValid = await JWTService.verifyToken(tokens.accessToken);
      expect(isValid).toBe(true);
    });

    it('should reject an invalid token', async () => {
      const isValid = await JWTService.verifyToken('invalid-token');
      expect(isValid).toBe(false);
    });
  });

  describe('verifyRefreshToken', () => {
    it('should verify a valid refresh token', async () => {
      const tokens = JWTService.generateTokens(userId);
      const isValid = await JWTService.verifyRefreshToken(tokens.refreshToken);
      expect(isValid).toBe(true);
    });

    it('should reject an invalid refresh token', async () => {
      const isValid = await JWTService.verifyRefreshToken('invalid-refresh-token');
      expect(isValid).toBe(false);
    });
  });

  describe('revokeToken', () => {
    it('should revoke a token', async () => {
      const tokens = JWTService.generateTokens(userId);
      await JWTService.revokeToken(tokens.accessToken);
      
      const isValid = await JWTService.verifyToken(tokens.accessToken);
      expect(isValid).toBe(false);
    });
  });

  describe('refreshTokens', () => {
    it('should generate new tokens with valid refresh token', async () => {
      const tokens = JWTService.generateTokens(userId);
      const newTokens = await JWTService.refreshTokens(tokens.refreshToken);

      expect(newTokens).not.toBeNull();
      expect(newTokens).toHaveProperty('accessToken');
      expect(newTokens).toHaveProperty('refreshToken');

      const isValid = await JWTService.verifyToken(newTokens!.accessToken);
      expect(isValid).toBe(true);
    });

    it('should return null with invalid refresh token', async () => {
      const newTokens = await JWTService.refreshTokens('invalid-refresh-token');
      expect(newTokens).toBeNull();
    });
  });
}); 