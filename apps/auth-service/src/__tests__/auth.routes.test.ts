import request from 'supertest';
import express from 'express';
import { authRouter } from '../routes/auth.routes';
import { JWTService } from '../services/jwt.service';

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('Auth Routes', () => {
  const userId = 'test-user-id';
  let validToken: string;
  let validRefreshToken: string;

  beforeEach(() => {
    const tokens = JWTService.generateTokens(userId);
    validToken = tokens.accessToken;
    validRefreshToken = tokens.refreshToken;
  });

  describe('POST /auth/verify', () => {
    it('should verify a valid token', async () => {
      const response = await request(app)
        .post('/auth/verify')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('valid', true);
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .post('/auth/verify');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Token manquant');
    });

    it('should reject invalid token', async () => {
      const response = await request(app)
        .post('/auth/verify')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Token invalide ou expiré');
    });
  });

  describe('POST /auth/refresh', () => {
    it('should refresh tokens with valid refresh token', async () => {
      const response = await request(app)
        .post('/auth/refresh')
        .send({ refreshToken: validRefreshToken });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });

    it('should reject request without refresh token', async () => {
      const response = await request(app)
        .post('/auth/refresh')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Refresh token manquant');
    });

    it('should reject invalid refresh token', async () => {
      const response = await request(app)
        .post('/auth/refresh')
        .send({ refreshToken: 'invalid-refresh-token' });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Refresh token invalide');
    });
  });

  describe('POST /auth/revoke', () => {
    it('should revoke a valid token', async () => {
      const response = await request(app)
        .post('/auth/revoke')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Token révoqué avec succès');

      // Vérifier que le token est bien révoqué
      const verifyResponse = await request(app)
        .post('/auth/verify')
        .set('Authorization', `Bearer ${validToken}`);

      expect(verifyResponse.status).toBe(401);
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .post('/auth/revoke');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Token manquant');
    });
  });
}); 